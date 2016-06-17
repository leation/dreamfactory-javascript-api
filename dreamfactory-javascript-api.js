var DfServer = 'http://192.168.100.216:8888/';
var AppName = 'myApp1';

function getToken() {
    return $.cookie('GEO_Token');
}

function loginUser(name, pwd) {
    var url = DfServer + 'rest/user/session';
    var data = {
        'email': name,
        'password': pwd
    };
    var loginState = false;
    $.ajax({
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        url: url,
        data: JSON.stringify(data),
        cache: false,
        async: false,
        type: 'POST',
        headers: {
            "X-DreamFactory-Application-Name": AppName
        },
        success: function (response) {
            $.cookie("GEO_USERNAME", name, { expires: 1, path: '/' });
            $.cookie("GEO_Token", response.session_id, { expires: 1, path: '/' });
            loginState = true;
            $.cookie("first_name", response.first_name, { expires: 1, path: '/' });
            $.cookie("last_name", response.last_name, { expires: 1, path: '/' });
            $.cookie("display_name", response.display_name, { expires: 1, path: '/' });
        },
        error: function (response) {
            var msg = "account erro!";
            if (response.content && response.content.data && response.content.data.error) {
                msg += "detail:£º" + response.content.data.error[0].message;
            }
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            alert(msg);
        }
    });
    return loginState;
}

function getRecordsByFilter(database, table, filter, success, error, async) {
    var url = DfServer + 'rest/' + database + '/' + table;
    var token = getToken();
    var data = null;
    if (filter == null || filter == "" || filter == undefined)
        data = null;
    else
        data = { filter: filter };
    if (async == null)
        async = false;
    $.ajax({
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: url,
        data: data,
        cache: false,
        async: async,
        type: 'GET',
        headers: {
            "X-DreamFactory-Application-Name": AppName,
            "X-DreamFactory-Session-Token": token
        },
        success: function (response) {
            if (typeof success !== 'undefined') {
                success(response);
            }
        },
        error: function (response) {
            var msg = "unknown error£¡";
            if (response.content && response.content.data && response.content.data.error)
                msg = response.content.data.error[0].message;
            else if (response.responseText)
                msg = JSON.stringify(response.responseText);
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            if (typeof error !== 'undefined' && error) {
                error(msg);
            }
        }
    });
}

function getRecordsByFilterOrder(database, table, filter, order, success, error, async) {
    var url = DfServer + 'rest/' + database + '/' + table;
    var token = getToken();
    var data = null;
    if (!filter)
        filter = "";
    data = { filter: filter, order: order };
    if (async == null)
        async = false;
    $.ajax({
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: url,
        data: data,
        cache: false,
        async: async,
        type: 'GET',
        headers: {
            "X-DreamFactory-Application-Name": AppName,
            "X-DreamFactory-Session-Token": token
        },
        success: function (response) {
            if (typeof success !== 'undefined') {
                success(response);
            }
        },
        error: function (response) {
            var msg = "unknown error£¡";
            if (response.content && response.content.data && response.content.data.error)
                msg = response.content.data.error[0].message;
            else if (response.responseText)
                msg = JSON.stringify(response.responseText);
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            if (typeof error !== 'undefined' && error) {
                error(msg);
            }
        }
    });
}

function getPageRecordsByFilterOrder(database, table, filter, order, limit, offset, success, error, async) {
    var url = DfServer + 'rest/' + database + '/' + table;
    var token = getToken();
    var data = null;
    if (!filter)
        filter = "";
    data = { filter: filter, order: order, include_count: true, limit: limit, offset: offset };
    if (async == null)
        async = false;
    $.ajax({
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: url,
        data: data,
        cache: false,
        async: async,
        type: 'GET',
        headers: {
            "X-DreamFactory-Application-Name": AppName,
            "X-DreamFactory-Session-Token": token
        },
        success: function (response) {
            if (typeof success !== 'undefined') {
                success(response);
            }
        },
        error: function (response) {
            var msg = "unknown error£¡";
            if (response.content && response.content.data && response.content.data.error)
                msg = response.content.data.error[0].message;
            else if (response.responseText)
                msg = JSON.stringify(response.responseText);
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            if (typeof error !== 'undefined' && error) {
                error(msg);
            }
        }
    });
}

function addRecords(database, table, data, success, error, async) {
    var url = DfServer + 'rest/' + database + '/' + table;
    var token = getToken();
    if (data == null || data == "" || typeof data == 'undefined')
        return;
    if (async == null)
        async = false;
    $.ajax({
        dataType: 'json',
        contentType: 'application/json;',
        url: url,
        data: JSON.stringify(data),
        async: async,
        type: 'POST',
        headers: {
            "X-DreamFactory-Application-Name": AppName,
            "X-DreamFactory-Session-Token": token
        },
        success: function (response) {
            if (typeof success !== 'undefined') {
                success(response);
            }
        },
        error: function (response) {
            var msg = "unknown error£¡";
            if (response.content && response.content.data && response.content.data.error)
                msg = response.content.data.error[0].message;
            else if (response.responseText)
                msg = JSON.stringify(response.responseText);
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            if (typeof error !== 'undefined' && error) {
                error(msg);
            }
        }
    });
}

function updateRecords(database, table, data, success, error, async) {
    var url = DfServer + 'rest/' + database + '/' + table;
    var token = getToken();
    if (data == null || data == "" || typeof data == 'undefined')
        return;
    if (async == null)
        async = false;
    $.ajax({
        dataType: 'json',
        contentType: 'application/json;',
        url: url,
        data: JSON.stringify(data),
        cache: false,
        async: false,
        type: 'PUT',
        headers: {
            "X-DreamFactory-Application-Name": AppName,
            "X-DreamFactory-Session-Token": token
        },
        success: function (response) {
            if (typeof success !== 'undefined') {
                success(response);
            }
        },
        error: function (response) {
            var msg = "unknown error£¡";
            if (response.content && response.content.data && response.content.data.error)
                msg = response.content.data.error[0].message;
            else if (response.responseText)
                msg = JSON.stringify(response.responseText);
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            if (typeof error !== 'undefined' && error) {
                error(msg);
            }
        }
    });
}

function deleteRecordsByFilter(database, table, filter, success, error, async) {
    var url = DfServer + 'rest/' + database + '/' + table;
    var token = getToken();
    if (filter == null || filter == "" || typeof filter == 'undefined')
        return;
    if (async == null)
        async = false;
    var data = { filter: filter };
    $.ajax({
        dataType: 'json',
        contentType: 'application/json;',
        url: url,
        data: JSON.stringify(data),
        cache: false,
        async: false,
        type: 'DELETE',
        headers: {
            "X-DreamFactory-Application-Name": AppName,
            "X-DreamFactory-Session-Token": token
        },
        success: function (response) {
            if (typeof success !== 'undefined') {
                success(response);
            }
        },
        error: function (response) {
            var msg = "unknown error£¡";
            if (response.content && response.content.data && response.content.data.error)
                msg = response.content.data.error[0].message;
            else if (response.responseText)
                msg = JSON.stringify(response.responseText);
            msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
            if (typeof error !== 'undefined' && error) {
                error(msg);
            }
        }
    });
}
