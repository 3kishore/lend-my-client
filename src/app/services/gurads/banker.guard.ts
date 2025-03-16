import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { CommonHelperService } from "../../utils/helpers/common-helper.service";
import { APP } from "../../utils/constants/APP.const";

export const BankerGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const sessionObj = inject(CommonHelperService).getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  if(sessionObj?.userDetail?.role?.toLocaleLowerCase() === 'banker') {
      return true;
  } else {
      router.navigate([APP.ROUTES.LOAN_APPLICATION_STATUS])
      return false;
  }
}
