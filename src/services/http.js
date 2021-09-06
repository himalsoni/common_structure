import { DeviceEventEmitter } from 'react-native';
import { AppConfig } from "@common";
import { toast, log } from "@common/Tools";

class HTTP {
  mobile = "";
  password = "";

  constructor(){}

  setCredentials(mobile, password){
    this.mobile  = mobile;
    this.password= password;
  }

  POST (url, data)  {
      return new Promise((resolve, reject) => {

        fetch(AppConfig.PTApp.url + url, {
          method: "POST",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(response => {
            log('first ever ever ever ='+JSON.stringify(response));
            if(response.status != 200){
                reject({
                  error: "Request Failed **",
                  status:"failed"
                });
              return;
            }

            return response.json()
        })
        .then(responseJson => {
            if (responseJson && responseJson.result) {
                  resolve(responseJson.result);
               } else if(responseJson && responseJson.error) {
                if(responseJson.error.message == "Odoo Session Expired") {
                      let loginObj = {
                        "params" : {
                          "login" : this.mobile,
                          "password" : this.password,
                          "db": "ptapp"
                        }
                      }
                      this.POST("/web/session/authenticate", loginObj).then(respoJson => {
                      if(respoJson && respoJson.status == "success") {
                            this.POST(url, data).then(responseAfterData => {
                                resolve(responseAfterData);
                            }).catch(error => {
                                reject(error);
                            });
                       }else {
                          DeviceEventEmitter.emit('logoutAction');
                          reject({
                            error: respoJson.error,
                            status: "failed"
                          });
                      }
                  }).catch(error => {
                          reject(error);
                      });
                }else{
                  reject({
                      error: responseJson.error.message,
                      status: "failed"
                  });
                }
             } else {
              resolve([]);
            }
          })
          .catch(error => {
            log('main exception ='+error);
            // When webisite is not reachable
            // May be server down or internet is not connected
            if (error.stack) {
              reject({
                error: error.message,
                status: "failed"
              });
            } else if (error.error) {
              reject({
                error: error.error.message,
                status: "failed"
              });
            } else {
              // Odoo Exceptions raised from backend.
              reject(error);
            }
          });
      });
    }
}

export default new HTTP();
