 class URLBuilder{
  public get(){
    return window.location.protocol + '//' + window.location.host + '/backend';
  };
}

export const environment = {
  production: true,
  main_api_url: new URLBuilder().get()
};
