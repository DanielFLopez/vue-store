from django.urls import include, path
from products.views import ProductViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import CustomTokenObtainPairView, LogoutView, RegisterViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"register", RegisterViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
    path("api/api-token/", CustomTokenObtainPairView.as_view(), name="api-token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", LogoutView.as_view(), name="api-logout"),
]
