from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from app.user.models import User, Profile

admin.site.site_title = "DjangoReactDocker Administrator panel"
admin.site.index_title = "DjangoReactDocker | Administrator panel "
admin.site.site_header = "DjangoReactDocker | Administrator Dashboard"

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'name', 'is_admin', 'is_active','id')
    list_filter = ('is_admin', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email', 'name')
    ordering = ('email',)
    filter_horizontal = ()


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address', 'gender', 'created_at', 'updated_at')
    search_fields = ('user__email', 'phone', 'address')
    list_filter = ('gender',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {'fields': ('user', 'avatar', 'gender', 'phone', 'address')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)