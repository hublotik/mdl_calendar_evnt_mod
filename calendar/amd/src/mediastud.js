let elements = document.getElementsByTagName("*");
let parsed_time_eachday = [];
let originalDisplay = [];
const page_link = window.location.href;
// const regex = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&course=\d+$/;
// // const regex = /^https?:\/\/[a-zA-Z0-9.-]+(:\d+)?\/calendar\/view\.php\?view=month&course=\d+$/;
// const regex_v2 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&course=\d+#$/;
// // const regex_v2 = /^https?:\/\/[a-zA-Z0-9.-]+(:\d+)?\/calendar\/view\.php\?view=month&course=\d+#$/;
// const regex_v3 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&time=\d+&course=\d+$/;
// // const regex_v3 = /^https?:\/\/[a-zA-Z0-9.-]+(:\d+)?\/calendar\/view\.php\?view=month&time=\d+&course=\d+$/;
// // const regex_v4 = /^https?:\/\/[a-zA-Z0-9.-]+(:\d+)?\/calendar\/view\.php\?view=month&time=\d+&course=\d+#$/;
// const regex_v4 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&time=\d+&course=\d+#$/;
const regex = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&course=2229+$/;
const regex_v2 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&course=2229+#$/;
const regex_v3 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&time=\d+&course=2229+$/;
const regex_v4 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=month&time=\d+&course=2229+#$/;
//our course:2229 

// https://m.lms.ulstu.ru/calendar/view.php?view=day&time=1701288000
const regex_day = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=day&time=\d+$/;
const regex_day_v2 = /^https:\/\/[a-zA-Z0-9.-]+\/calendar\/view\.php\?view=day&time=\d+#$/;

if (regex_day.test(page_link) || regex_day_v2.test(page_link)) {
    document.body.style.filter = "blur(20px)";
    window.addEventListener('load', function () {
        let divs_with_evnt_settings = Array.from(document.getElementsByClassName('event mt-3'));
        divs_with_evnt_settings.forEach(div => {
            if (div.getAttribute('data-course-id') == '2229') {
                div.parentElement.style.display = 'none';
            }
        });
        document.body.style.filter = "blur(0px)";
    });
}


function remove_day_chng_links() {
    let day_change_a = Array.from(document.getElementsByClassName('aalink day'));
    day_change_a.forEach(a_els => {
        let spanElement = document.createElement("span");
        spanElement.classList = 'table_days';
        spanElement.innerText = a_els.innerText;
        a_els.parentNode.replaceChild(spanElement, a_els);
    });
}

function modal_form_actions(els_for_modal_call) {
    let usr_name_surname = document.getElementsByClassName('value')[0].innerText; //get name and surname of current user

    for (let i = 0; i < els_for_modal_call.length; i++) {
        // Set onclick event for each element
        els_for_modal_call[i].onclick = function () {

            //don't show modal during load
            console.log(els_for_modal_call);
            setTimeout(function () {
                if (document.getElementsByClassName('summary-modal-container')[0] == undefined) {
                    let parsed_times_eachday = parse_mounted_times();
                    console.log(parsed_times_eachday);
                    document.getElementsByClassName('modal-content')[0].style.filter = "blur(20px)";
                    alert('Заполните форму записи');
                    let time = '';
                    let day = '';
                    setTimeout(function () {
                        //hide uneccesary elements
                        let checkbox_el = document.getElementsByClassName('col-md-9 checkbox')[0];
                        if (checkbox_el != undefined) {
                            checkbox_el.style.display = 'none';
                        }
                        const set_disp_none_modal = ['fitem_id_eventtype', 'fitem_id_courseid', 'id_location', 'fitem_id_location', 'fgroup_id_durationgroup', 'id_timestart_calendar']
                        set_disp_none(set_disp_none_modal);
                        label_inner_text('fitem_id_name', 'Название кафедры или подразделения, Телефон');
                        label_inner_text('fitem_id_description', 'Контактные данные (ФИО)');
                        let hours_div = document.querySelectorAll('[name="timestart[hour]')[0].parentElement.parentElement;
                        let hours_desc = document.createElement('p');
                        hours_desc.innerText = 'Время в часах';
                        hours_desc.classList.add('ml-1')
                        hours_div.appendChild(hours_desc);
                        //select :00 minutes by default to prevent user to choose minutes;
                        let minute_select = document.getElementById('id_timestart_minute');
                        minute_select.selectedIndex = 0; //set index of 0
                        //hide parent div for user as well
                        minute_select.parentElement.parentElement.style.display = 'none';
                    }, 1000);
                    setTimeout(function () {
                        document.getElementsByClassName('moreless-toggler')[0].click();
                        let name_phone_form = document.getElementById('id_descriptioneditable').firstChild;
                        name_phone_form.innerText = usr_name_surname;
                        name_phone_form.contentEditable = false;
                        setTimeout(function () {
                            document.getElementsByClassName('moreless-toggler moreless-less')[0].style.display = 'none';
                        }, 250);
                        document.getElementsByClassName('modal-content')[0].style.filter = "blur(0px)";
                    }, 1000);



                    if (document.querySelector('#new_save_btn_id') == null) {
                        let modal_save_btn = document.querySelectorAll('[data-action="save"]')[0];
                        modal_save_btn.style.display = 'none';
                        //  Create a clone of the element
                        const clonedElement = modal_save_btn.cloneNode(true);
                        clonedElement.id = 'new_save_btn_id';
                        clonedElement.setAttribute('data-action', 'new_btn_save');
                        //  Make the cloned element visible
                        clonedElement.style.display = 'inline';
                        //  Insert the cloned element back into the DOM
                        modal_save_btn.parentNode.insertBefore(clonedElement, modal_save_btn.nextSibling);

                        // create on click for save button 
                        clonedElement.onclick = function () {
                            let hour = modal_time_select('[name="timestart[hour]"]');
                            // let minute = modal_time_select('[name="timestart[minute]"]');
                            // time = hour + ":" + minute;
                            time = String(hour);
                            day = modal_time_select('[name="timestart[day]"]') + 1;
                            console.log(day, time);
                            const filteredEvents = filterEventsByDayAndTime(parsed_times_eachday, day, time);
                            let check_repeated_times_array = filteredEvents.map(event => event.times);
                            let calendar_initial_id = document.getElementsByClassName('calendarwrapper')[0].id;


                            if (check_repeated_times_array.length != 0) {
                                alert('Запись на данное время уже существует');
                            } else {
                                document.getElementsByClassName('icon fa fa-level-down fa-fw ')[0].click();
                                modal_save_btn.click();
                                setTimeout(function () {
                                    remove_arrows(); //remove aroow buttons on page load after modal submition
                                    parsed_time_eachday = parse_mounted_times();
                                    console.log(parsed_time_eachday);
                                    location.reload();
                                    setTimeout(function () {
                                        document.getElementsByClassName('calendarwrapper')[0].id = calendar_initial_id;
                                        console.log(els_for_modal_call);
                                    }, 3000);
                                }, 2000);
                            }
                            console.log(els_for_modal_call);
                            console.log(check_repeated_times_array);
                        }
                    }
                } else {
                    setTimeout(function () {
                        // alert('Вы можете удалить запись и создать новую');
                        let btn_save_edit_ev = document.querySelector('[data-action="delete"]');
                        // document.querySelector('[data-action="edit"]').remove();

                        btn_save_edit_ev.onclick = function () {
                            setTimeout(function () {
                                let btn_save_edit_ev_snd = document.querySelector('[data-action="save"]')
                                btn_save_edit_ev_snd.onclick = function () {
                                    location.reload();
                                }
                            }, 500);
                            // location.reload();

                        }

                    }, 100);

                }

            }, 1000);
        };

    }
}



function label_inner_text(el_id, inner_text) {
    document.getElementById(el_id).querySelector('label').innerHTML = inner_text;
}

function set_disp_none(id_to_select_list) {
    for (var i = 0; i < id_to_select_list.length; i++) {
        const id_to_select = id_to_select_list[i];
        document.getElementById(id_to_select).style.display = 'none';
    }
}

function modal_time_select(atr_to_find) {
    time_str = document.querySelectorAll(atr_to_find)[0].selectedIndex;
    return time_str;
}

function parse_mounted_times() {
    let mounted_times = {};
    let mounted_times_list = [];
    const event_months_divs = document.getElementsByClassName('d-none d-md-block hidden-phone text-xs-center');
    for (let i = 0; i < event_months_divs.length; i++) {
        let all_li_els_uncl = event_months_divs[i].querySelectorAll('li');
        let all_li_els = Array.from(all_li_els_uncl).filter(li => li.getAttribute('data-event-eventtype') == 'course');
        if (all_li_els.length != 0) {
            let event_day = event_months_divs[i].getElementsByClassName('table_days').innerText;
            // console.log(all_li_els);
            let event_time = [];
            for (var i2 = 0; i2 < all_li_els.length; i2++) {
                let items_to_check_time_div = all_li_els[i2].querySelector('div')
                if (items_to_check_time_div.parentNode != null) {
                    event_time.push(items_to_check_time_div.innerText.split(':')[0]);
                } else {
                    let items_to_check_time = items_to_check_time_div.querySelector('span');
                    if (items_to_check_time != null) {
                        event_time += items_to_check_time.innerHTML.split(':')[0];
                    }
                }
            }
            mounted_times = {
                day: event_day,
                times: event_time
            };
            mounted_times_list.push(mounted_times);
        }

    }
    return mounted_times_list;
}

function filterEventsByDayAndTime(events, specifiedDay, specifiedTime) {
    return events.filter(event => {
        return event.day == specifiedDay && event.times.includes(specifiedTime);
    });
}

function remove_arrows() {
    document.getElementsByClassName('arrow_link next')[0].remove();
    document.getElementsByClassName('arrow_link previous')[0].remove();
    document.getElementsByClassName('current')[1].style.float = "left";
}

function hide_page_els() {
    for (var i = 0; i < elements.length; i++) {
        originalDisplay[i] = elements[i].style.display;
        elements[i].style.display = "none";
    }
}

function show_page_els() {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = originalDisplay[i];
    }
}



if (regex.test(page_link) || regex_v2.test(page_link) || regex_v3.test(page_link) || regex_v4.test(page_link)) {
    document.addEventListener("DOMContentLoaded", function () {
        hide_page_els();
    });
    let parsed_times_eachday = [];
    window.addEventListener('load', function () {
        remove_day_chng_links();
        let target_el_prev = document.getElementsByClassName('singlebutton')[0];
        let target_el_next = document.getElementsByClassName('singlebutton')[1];
        function new_arr_butns(l_r_i, query, description) {
            let arrow = document.getElementsByClassName(query)[0];
            let new_arrow = document.createElement('a');
            new_arrow.href = arrow.href;
            new_arrow.innerText = description;
            new_arrow.setAttribute('class', 'btn btn-primary');
            return new_arrow;
        }
        let next_btn = new_arr_butns(1, 'arrow_link next', 'Следующий месяц', 'ml-1');
        next_btn.setAttribute('class', 'btn btn-primary ml-1');
        let prev_btn = new_arr_butns(0, 'arrow_link previous', 'Предыдущий месяц');
        target_el_prev.parentNode.insertBefore(prev_btn, target_el_prev.previousSibling);
        target_el_next.parentNode.insertBefore(next_btn, target_el_next.nextSibling);
        target_el_prev.remove();
        target_el_next.remove();
        els = document.querySelectorAll('a[data-action="filter-event-type"] > span.eventname')

        for (var i = 0; i < els.length; i++) {
            if (i != 2) {
                els[i].click();
            }
        }
        remove_arrows(); //remove aroow buttons on page load

        show_page_els();
        document.getElementsByClassName('d-print-none')[1].style.display = 'none'

        set_disp_none_main = ['page-navbar', 'course', 'calendarviewdropdown'];
        set_disp_none(set_disp_none_main);



        /// Now let's add script for modal form
        // Get the HTML collection
        let els_for_modal_call = [];
        let button_modal = document.querySelector('[data-action="new-event-button"]');
        let button_modal_days = document.getElementsByClassName('btn btn-secondary float-sm-right float-right')[0];
        let els_for_modal_call_collection = document.getElementsByClassName('day text-sm-center text-md-left clickable')
        let els_for_modal_call_main = Array.from(els_for_modal_call_collection);
        let el_with_name = document.getElementsByClassName('row mt-1');
        let usr_name_surname = document.getElementsByClassName('value')[0].innerText;
        for (let i = 0; i < el_with_name.length; i++) {
            let el_to_del = el_with_name[i].previousElementSibling.previousElementSibling;
            if (el_with_name[i].innerText != usr_name_surname) {
                //remove a el to prevent user to change events
                if (el_to_del != null) {
                    el_to_del.remove()
                }

            } else {
                el_to_del.onclick = function () {
                    hide_page_els();
                    setTimeout(function () {
                        show_page_els();
                        let user_ev_edit_btn = document.querySelector('[data-action="edit"]');
                        let edit_modal_del_btn = document.querySelector('[data-action="delete"]');
                        // Create a copy of the button
                        const new_del_btn = edit_modal_del_btn.cloneNode(true);

                        // Hide the original button
                        edit_modal_del_btn.style.display = 'none';

                        // Add the new button to the same parent element as the original button
                        edit_modal_del_btn.parentNode.append(new_del_btn);
                        els_for_modal_call.push(user_ev_edit_btn);
                        new_del_btn.onclick = function () {
                            setTimeout(function () {
                                let final_del_btn = document.querySelector('[data-action="save"]');
                                final_del_btn.onclick = function () {
                                    location.reload();
                                }
                            }, 500);
                        }
                        console.log(els_for_modal_call);
                        modal_form_actions(els_for_modal_call);

                    }, 1000);

                }
            }

        }
        els_for_modal_call.push(button_modal, button_modal_days, ...els_for_modal_call_main);
        modal_form_actions(els_for_modal_call);
    });

}
