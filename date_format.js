// date_format.js

function date_format(str_date=null, format='', lang='ru', json_local=false){
	let date = new Date(str_date);
	
	if(isNaN(date)){
		return false;
	}
	
	if(json_local == false){
		json_local = {
			'ru': {
				'DDDD':		['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
				'DDD':		['пон.', 'вто.', 'сре.', 'чет.', 'пят.', 'суб.', 'вос.'],
				
				'MMMM':		['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
				'MMM':		['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
			}
		}
	}
	
	if(!json_local[lang]){
		lang = 'ru';
	}
	
	let json_date = {}
	
	json_date['ms'] = date.getMilliseconds();
	json_date['sec'] = date.getSeconds();
	json_date['minute'] = date.getMinutes();
	json_date['hour'] = date.getHours();
	json_date['date'] = date.getDate();
	json_date['day_week'] = date.getDay();
	json_date['month'] = date.getMonth()+1;
	json_date['year'] = date.getFullYear();
	json_date['timezone'] = date.getTimezoneOffset();
	json_date['timezone_utc'] = json_date['timezone'] / -60;
	
	let arr_replace = [
		['YYYY',	json_date['year']],
		['YYY',		(json_date['year'] + '').substr(-3)],
		['YY',		(json_date['year'] + '').substr(-2)],
		
		['DDDD',	json_local[lang]['DDDD'][json_date['day_week']]],
		['DDD',		json_local[lang]['DDD'][json_date['day_week']]],
		
		['MMMM',	json_local[lang]['MMMM'][json_date['month']-1]],
		['MMM',		json_local[lang]['MMM'][json_date['month']-1]],	
		
		['MM',		('0' + json_date['month']).substr(-2)],
		['M',		json_date['month']],

		['DD',		('0' + json_date['date']).substr(-2)],
		['D',		'' + json_date['date']],
		
		['HH',		('0' + json_date['hour']).substr(-2)],
		['H',		'' + json_date['hour']],
		
		['mm',		('0' + json_date['minute']).substr(-2)],
		['m',		'' + json_date['minute']],
		
		['ss',		('0' + json_date['sec']).substr(-2)],
		['s',		'' + json_date['sec']],
		
		['SSS',		(json_date['ms'] + '000').substr(0, 3)],
		['SS',		(json_date['ms'] + '00').substr(0, 2)],
		['S',		(json_date['ms'] + '').substr(0, 1)],
		
		['z',		json_date['zone']]
	];
	
	
	let result = format+'';
	arr_replace.forEach(function(item){
		result = result.replaceAll(item[0],	item[1]);
	});
	
	return result;
}
