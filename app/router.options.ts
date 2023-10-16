import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  routes: (_routes) => {
    const { ssrContext } = useNuxtApp();
    const pcSubDomain = "localhost";
    const mobileSubDomain = "m";
    let routesDirectory: any = null;

    // server-side에서 url로 subDomain 체크
    if (process.server && ssrContext && ssrContext.event.node.req) {
      const req = ssrContext.event.node.req;
      const subDomain = req.headers.host?.split(".")[0];

      if (subDomain === "www" || subDomain === pcSubDomain) {
        routesDirectory = "pc";
      } else if (subDomain === mobileSubDomain) {
        routesDirectory = "mobile";
      }
    }

    // client-side에서 url로 subDomain 체크
    if (process.client && window.location.hostname) {
      const subDomain = window.location.hostname.split(".")[0];

      if (subDomain === "www" || subDomain === pcSubDomain) {
        routesDirectory = "pc";
      } else if (subDomain === mobileSubDomain) {
        routesDirectory = "mobile";
      }
    }

    // route의 경로와 pages 폴더의 경로를 비교
    function checkIsUnderDirectory(path: string, directory: "pc" | "mobile") {
      return path === "/" + directory || path.startsWith("/" + directory + "/");
    }

    let newRoutes = [..._routes];

    if (routesDirectory) {
      newRoutes = _routes
        .filter((route: any) => {
          // routesDirectory가 pc면 pc 경로만, mobile이면 mobile 경로만 가져옴
          return checkIsUnderDirectory(route.path, routesDirectory);
        })
        .map((route: any) => {
          // 접근가능한 route 경로 재설정
          return {
            ...route,
            path: route.path.substr(routesDirectory.length + 1) || "/",
            name: route.name || "index",
          };
        });

      console.log("_routes", _routes);
      console.log("newRoutes", newRoutes);
      return newRoutes;
    }
  },
};
