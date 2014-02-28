;function main($) {
	$(document).ready(function($) {
		var css_link = $("<link>", { 
      rel: "stylesheet", 
      type: "text/css", 
      href: "https://s3.amazonaws.com/lawkickstas/lawkick.css" 
		});
		css_link.appendTo('head');

		$.ajax({
		    type : "GET",
		    url :"https://s3.amazonaws.com/lawkickstas/lawkick_html.json?callback=?",
		    dataType :"jsonp",
		    jsonp: false,
		    jsonpCallback: "myJsonMethod",
		    success : function(data){
		        document.getElementById("widget_wrapper").innerHTML = data.html;
		        var quiz = new Quiz(document.getElementById("question"));
		    },
		    error : function(httpReq,status,exception){
		        alert(status+" "+exception);
		    }
		});
		function Quiz(elem) {
			this.$elem = $(elem);
			this.questions = ["2 + 2 ==", "3^2 == ", "Find the smallest cube for which exactly five permutations of its digits are cube"];
			this.correctAnswers = [4, 9, 5027];
			this.hints = ["Good luck Stas, I hope you were paying attention in 2nd grade.", "Now we're rollin'", "Check the console for help..."]
			this.correctAnswerCount = 0;
			this.$answerInput = $(document.forms[0].children[0]);
			this.$result = $("#result");
			this.presentQuestion(this.questions[this.correctAnswerCount]);
			this.hint();
			var that = this;
			this.$answerInput.keypress(function(event) {
				if ( event.which == 13 ) {
				     event.preventDefault();
				     that.check(event.currentTarget.value);
				  }
			});
		};

		Quiz.prototype = {
			constructor: Quiz,
			presentQuestion: function(q) {
				this.$elem.text(q);
			},
			check: function(ans) {
				if (ans == this.correctAnswers[this.correctAnswerCount]) {
					if (this.correctAnswerCount == 1) {
						setTimeout(function() {	console.log("ps hire me");}, 15000);
					}
					if (this.correctAnswerCount == 2) {
						this.finished();
						return;
					}
					this.$answerInput.val("");
					this.correctAnswerCount += 1;
					this.presentQuestion(this.questions[this.correctAnswerCount]);
					this.$result.text("Nice Stas, time for question " + (this.correctAnswerCount+1) + "!").css("color", "green");
					this.hint();

				} else {
					this.$result.text("Sorry Stas, try again").css("color", "red");
				}
			},
			hint: function() {
				$("#hints").text(this.hints[this.correctAnswerCount]);
			},
			finished: function() {
				var $widget = $("#nates_widget");
				$widget.text("");
				$widget.append($("<a>", 
				{
				    href: "#", 
				    html: $("<img>", { src: "http://c.crossmap.christianpost.com/images/0/69/6968.jpg" })
				}));
				$widget.append("<div id='finalMessage'>You did it!</div>");
			}
		}
		window.Quiz = Quiz;

	});
	
};

// initialize 

;(function() {

	var jQuery, d3;

	/******** Load jQuery if not present *********/
	if (window.jQuery === undefined) {
	    var script_tag_jquery = document.createElement('script');
	    script_tag_jquery.setAttribute("src",
	        "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
	    script_tag_jquery.onload = scriptLoadHandler;
	    // Try to find the head, otherwise default to the documentElement
	    (document.head || document.documentElement).appendChild(script_tag_jquery);
	} else {
	    // The jQuery version on the window is the one we want to use
	    jQuery = window.jQuery;
	}
	/******** Called once jQuery has loaded ******/
	function scriptLoadHandler() {
	    // Restore $ and window.jQuery to their previous values and store the
	    // new jQuery in our local jQuery variable
	    jQuery = window.jQuery.noConflict(true);
	    // Call our main function
	    main(jQuery);
	}
	/******** Our main function ********/

	function cacheWrap() {
	function pow(n) {
    var cubed = Math.pow(n, 3).toString();
    // var int_array = (""+cubed).split("");
    var str = "";
    for (i=0;i<10;i++) {
        var re = new RegExp(i+"", "g");
        cubed.match(re) ? str +=cubed.match(re).length : str += "0";  
    }
    if (pow.cache[str]) {
        pow.cache[str].len += 1;

        if (pow.cache[str].len == 5) { 
            console.log(cubed); return pow.cache[str]; 
        } 
    } else {
        pow.cache[str] = { "len" : 1 };
        pow.cache[str][pow.cache[str].len] = n;
    }
    return pow(n+1);
	}
	pow.cache = {};
	return pow(345);
	}
	console.log(cacheWrap.toString());
	console.log("use that function and call cacheWrap()[1]");
}());