/**
 * Created by 31641 on 2016-12-25.
 */
function change(states, obj) {
    if (states == 'change') {
        obj.style.backgroundColor = '#FF0000';
    }
    else if (states == 'changeback') {
        obj.style.backgroundColor = '#66CCFF';
    }
    else if (states == 'down') {
        obj.style.marginTop = '3.75px';
        obj.style.width = '75px';
        obj.style.height = '42.5px';
    }
    else if (states == 'up') {
        obj.style.marginTop = '0px';
        obj.style.width = '100px';
        obj.style.height = '50px';
    }
}