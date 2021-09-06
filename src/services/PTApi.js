import HTTP from "./http";
class PTApi{
  constructor() {}

  login(data) {
    return HTTP.POST("/web/session/authenticate", data);
  }

  signup(data) {
    return HTTP.POST("/json/signup", data);
  }

  otpVerification(data) {
    return HTTP.POST("/json/verify_token", data);
  }

  resendOtp(data) {
    return HTTP.POST("/json/reset_token", data);
  }

  fetchAppSetting(){
    return HTTP.POST("/json/appsetting", {});
  }

  searchRead(model, domain, fields, listLimit, offset, context = {}){
    let myContext = {
      "search_extend": true
    };
    let obj = {
      "params": {
        "context": Object.assign(myContext,context),
        "model": model,
        "domain": domain,
        "fields": fields,
        "limit" : listLimit,
        "offset" : offset,
      },
    };
    return HTTP.POST("/web/dataset/search_read", obj);

  }
}
export default new PTApi();
