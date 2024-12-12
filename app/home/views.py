from django.shortcuts import render
from django.views import View


class FeaturesView(View):
    template_name = "features/index.html"

    def get(self, request, *args, **kwargs):
        context = {"products": None}
        return render(request, self.template_name, context)


class AboutMeView(View):
    template_name = "about/index.html"

    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, self.template_name, context)


class ProjectsView(View):
    template_name = "projects/index.html"

    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, self.template_name, context)
