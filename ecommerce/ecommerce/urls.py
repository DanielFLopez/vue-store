from django.urls import include, path
from products.views import ProductViewSet
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from users.views import RegisterViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"register", RegisterViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
    path("api/api-token-auth/", obtain_auth_token),
]
