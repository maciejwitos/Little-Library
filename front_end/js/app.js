$.ajax({
    url: "http://127.0.0.1:8000/book/",
    data: {},
    type: "GET",
    dataType: "json"
}).done(function (result) {

    var main_table = $('#main_table');


//#################################   DELETE BUTTON   ##########################################

    var button_del = $('<button>');

    button_del.on('click', function (event) {
        var book_id = event.target.parentElement.nextSibling;

        $.ajax({
            url: "http://127.0.0.1:8000/book/" + book_id.getAttribute('id'),
            data: {},
            type: "DELETE",
            dataType: "json"
        }).done(function (book_details) {
            location.reload()
        })

    });

//################################   DETAILS BUTTON   #############################################

    var button_det = $('<button>');

    button_det.on('click', function (event) {
        var book_id = event.target.parentElement.nextSibling;
        var div = $('#' + book_id.getAttribute('id'));

        if (div.css('display') === 'block') {
            div.css('display', 'none');
            div.empty()
        } else {

            $.ajax({
                url: "http://127.0.0.1:8000/book/" + book_id.getAttribute('id'),
                data: {},
                type: "GET",
                dataType: "json"
            }).done(function (book_details) {

                var div = $('#' + book_id.getAttribute('id'));
                div.css('display', 'block');
                var ul = $('<ul>');
                var li_id = $('<li>');
                var li_author = $('<li>');
                var li_title = $('<li>');
                var li_isbn = $('<li>');
                var li_publisher = $('<li>');
                var li_genre = $('<li>');


                div.append(ul);
                li_id.text(book_details['id']);
                li_author.text(book_details['author']);
                li_title.text(book_details['title']);
                li_isbn.text(book_details['isbn']);
                li_publisher.text(book_details['publisher']);
                li_genre.text(book_details['genre']);
                ul.append(li_id);
                ul.append(li_author);
                ul.append(li_title);
                ul.append(li_isbn);
                ul.append(li_publisher);
                ul.append(li_genre);

            })

        }

    });

//#############################   CREATE TABLE   ##########################################

    for (var i = 0; i < result.length; i++) {

        var new_row = $('<tr></tr>');
        var title = $('<td></td>');
        var author = $('<td></td>');
        var new_button_del = $(button_del.clone('true'));
        var new_button_det = $(button_det.clone('true'));
        var div = $('<div>');

        main_table.append(new_row);
        author.text(result[i]['author']);
        title.text(result[i]['title']);
        new_button_del.text('Usuń');
        new_button_det.text('Szczegóły');
        div.css('display', 'none');
        div.attr('id', result[i]['id']);

        new_row.append(author);
        new_row.append(title);
        new_row.append(new_button_del);
        new_row.append(new_button_det);
        new_row.after(div);


    }


});

//###################################   ADD BOOK   #############################################
// Musi być jak chcesz mieć submit
$( document ).ready(function() {

    $("#new_book_form").on('submit', function(e) {

        e.preventDefault(); // To jest potrzebne jak chcesz zatrzymać domyślną akcję - czyli submit form - nie przeładuje strony
        var data = JSON.stringify({
                    'author': $('#author').val(),
                    'title': $('#title').val(),
                    'isbn': $('#isbn').val(),
                    'publisher': $('#publisher').val(),
                    'genre': parseInt($('#genre').val()),
                    });

        $.ajax({
            url: "http://127.0.0.1:8000/book/",
            data: data,
            type: "post",
            dataType: "json",
            contentType: "application/json",
        }).done(function () {
            console.log('Dodano książkę!')
        });
    });
});


