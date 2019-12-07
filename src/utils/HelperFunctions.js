import * as CATEGORIES from '../constants/categories'

export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Нэгдүгээр сар','Хоёрдугаар сар','Гуравдугаар сар','Дөрөвдүгээр сар','Тавдугаар сар','Зургадугаар сар','Долдугаар сар','Наймдугаар сар','Есдүгээр сар','Аравдугаар сар','Арваннэгдүгээр сар','Арванхоёрдугаар сар'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ', ' + month + ', ' + year ;
    return time;
}
export function categoryConverter(id) {
    switch (id) {
        case CATEGORIES.TECHNOLOGY.id:
            return CATEGORIES.TECHNOLOGY.name;
        case CATEGORIES.BUSINESS.id:
            return CATEGORIES.BUSINESS.name;
        case CATEGORIES.SOCIAL.id:
            return CATEGORIES.SOCIAL.name;
    }
}
