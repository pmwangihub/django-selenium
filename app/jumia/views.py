from django.shortcuts import render
from django.views import View
from django.contrib import messages
from app.jumia.tasks import jumiaScrape
from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse
from app.jumia.models import Category


class JumiaScrapeView(View):
    template_name = "jumia/index.html"

    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, self.template_name, context)


class JumiaProject(View):
    template_name = "home/scrape.html"

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        context = {
            "categories": categories,
        }
        return render(request, self.template_name, context)


class JumiaScrapeWithUrlParams(View):
    """View to handle Jumia scraping with URL parameters."""

    def post(self, request, *args, **kwargs):
        data = request.POST
        pages = data.get("pages", None)
        category = data.get("category", None)
        category_name = data.get("category_name", None)
        customCategory = data.get("customCategory", None)
        url = None
        if (category == "custom") and (customCategory.strip() != ""):
            url = settings.BASE_URL + customCategory

        if (category != "custom") and (customCategory.strip() == ""):
            url = settings.BASE_URL + category
        if url is None:
            messages.error(request, f"Url could not be created Parameters provided")
            return redirect("jumia:project_panel")

        messages.success(
            request,
            f"""
            <b>PARAM/CATEGORY:</b>{category}<br>
            <b>URL:</b> <a href='{url}' target='_blank'>{url}</a><br>
            <b>CATEGORY NAME:</b>{category_name.strip()}<br>
            <b>customCategory:</b>{customCategory}<br>
            """,
        )
        try:
            jumiaScrape.delay(category_name.strip(), url.strip(), pages)
            # jumiaScrape.apply_async(
            #     kwargs={
            #         "category": category_name.strip(),
            #         "url": url,
            #         "pages": int(pages),
            #     }
            # )
        except Exception as e:
            messages.error(request, f"Scrapping failed with ERROR: {e}.")
            return redirect("jumia:project_panel")

        messages.success(
            request,
            f"Scrape started for url: {url}, Category: {category_name.strip()} with {pages} pages.",
        )

        return redirect("jumia:project_panel")


scrape_params = JumiaScrapeWithUrlParams.as_view()
