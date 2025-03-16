import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { CommonHelperService } from "../../utils/helpers/common-helper.service";
import { APP } from "../../utils/constants/APP.const";

export const PartnerGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const sessionObj = inject(CommonHelperService).getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  if(sessionObj?.userDetail?.role?.toLocaleLowerCase() === 'partner') {
      return true;
  } else {
        if(sessionObj?.userDetail?.role?.toLocaleLowerCase() === 'banker') {
            router.navigate([APP.ROUTES.MY_LEADS]);
        } else {
            router.navigate([APP.ROUTES.ORDER]);
        }
      return false;
  }
}
