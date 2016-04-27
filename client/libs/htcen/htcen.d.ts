declare class JuHeAgent {
	authed(cb: any);
	authin(appid: any, cb_authin: any, that: any);
	uinfo(cb_uinfo: any, that: any);
	ulogin(server_id: any, cb_gameserverlogin: any, that: any);
	pay(game_od: any, cb_pay: any, that: any);
	serviceinfo(cb_serviceinfo: any, that: any);
}

declare var JUHE: JuHeAgent;


