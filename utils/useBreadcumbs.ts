import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const breadcrumbMap: Record<string, string> = {
  management: "Management",
  monitoring: "Monitoring",
  profile: "Profile",
  settings: "Settings",
  notifications: "Notifications",
  analytics: "Analytics",
};

export function useBreadcrumbs() {
  const route = useRoute();
  const router = useRouter();

  return computed(() => {
    const segments = route.path.split("/").filter(Boolean);

    const breadcrumbs: {
      name: string;
      href: string | null;
      isLast: boolean;
    }[] = [];

    let accumulatedPath = "";

    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      const matchedRoute = router.getRoutes().find((r) => {
        return (
          r.path === accumulatedPath ||
          r.path === `${accumulatedPath}/index` ||
          r.path === `${accumulatedPath}/`
        );
      });

      const meta = matchedRoute?.meta as { breadcrumb?: string } | undefined;

      breadcrumbs.push({
        name: meta?.breadcrumb || breadcrumbMap[segment] || segment,
        href: matchedRoute ? accumulatedPath : null,
        isLast,
      });
    });

    return breadcrumbs;
  });
}
