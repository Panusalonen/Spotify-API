var next;

$("#submit-button").on("click", function() {
    var userInput = $("input").val();
    var artistOrAlbum = $("select").val();
    var baseUrl = "https://elegant-croissant.glitch.me/spotify";
    var more = $("#more");

    $.ajax({
        url: baseUrl,
        data: {
            query: userInput,
            type: artistOrAlbum
        },
        success: function(data) {
            data = data.artists || data.albums;
            $(".results").html("");

            if (data.items.length == 0) {
                $(".results").append(
                    '<div class="item">' + "No Match" + "</div>"
                );
            } else {
                $(".results").append(
                    '<div class="show">' + "Results for " + userInput + "</div>"
                );

                for (var i = 0; i < data.items.length; i++) {
                    var image = "speaker-hi.png";
                    var url = data.items[i].external_urls["spotify"];

                    if (data.items[i].images[0]) {
                        image = data.items[i].images[0].url;
                    }

                    $(".results").append(
                        "<div class='item'>" +
                            "<a href=" +
                            url +
                            ">" +
                            "<img class='image' src='" +
                            image +
                            "' alt='spotify pic'>" +
                            "</a>" +
                            "<div class='names'>" +
                            "<a href=" +
                            url +
                            ">" +
                            data.items[i].name +
                            "</a>" +
                            "</div>" +
                            "</div>"
                    );
                }
            }

            next =
                data.next &&
                data.next.replace(
                    "https://api.spotify.com/v1/search",
                    "https://elegant-croissant.glitch.me/spotify"
                );
            if (next) {
                checkScrollPos();
            }
        }
    });
});

$("#more-button").on("click", function() {
    console.log(next);
    $.ajax({
        url: next,
        success: function(data) {
            data = data.artists || data.albums;
            // $('.results').html('');

            for (var i = 0; i < data.items.length; i++) {
                var image = "speaker-hi.png";
                var url = data.items[i].external_urls["spotify"];

                if (data.items[i].images[0]) {
                    image = data.items[i].images[0].url;
                }

                $(".results").append(
                    "<div class='item'>" +
                        "<a href=" +
                        url +
                        ">" +
                        "<img class='image' src='" +
                        image +
                        "' alt='spotify pic'>" +
                        "</a>" +
                        "<div class='names'>" +
                        "<a href=" +
                        url +
                        ">" +
                        data.items[i].name +
                        "</a>" +
                        "</div>" +
                        "</div>"
                );
            }
            next =
                data.next &&
                data.next.replace(
                    "https://api.spotify.com/v1/search",
                    "https://elegant-croissant.glitch.me/spotify"
                );
            if (next) {
                $("#more-button").css({ visibility: "visible" });
            }
        }
    });
});

function checkScrollPos() {
        var scrollTop = $(document).scrollTop(); //
        var windowHeight = $(window).height();
        var totalHeight = scrollTop + windowHeight;
        var documentHeight = $(document).height();

        if (totalHeight >= documentHeight - 47) {
            $.ajax({
                url: next,
                success: function(data) {
                    data = data.artists || data.albums;
                    // $('.results').html('');

                    for (var i = 0; i < data.items.length; i++) {
                        var image = "speaker-hi.png";
                        var url = data.items[i].external_urls["spotify"];

                        if (data.items[i].images[0]) {
                            image = data.items[i].images[0].url;
                        }

                        $(".results").append(
                            "<div class='item'>" +
                                "<a href=" +
                                url +
                                ">" +
                                "<img class='image' src='" +
                                image +
                                "' alt='spotify pic'>" +
                                "</a>" +
                                "<div class='names'>" +
                                "<a href=" +
                                url +
                                ">" +
                                data.items[i].name +
                                "</a>" +
                                "</div>" +
                                "</div>"
                        );
                    }
                    next =
                        data.next &&
                        data.next.replace(
                            "https://api.spotify.com/v1/search",
                            "https://elegant-croissant.glitch.me/spotify"
                        );
                    if (next) {
                        checkScrollPos();
                    }
                }
            });
        } else {
            setTimeout(checkScrollPos, 500);
        }
}
