from app import my_app
from flask import render_template, redirect, url_for
    
    
@my_app.route('/yoshinari')
def view_top():
    return render_template("index.html")

@my_app.route('/yoshinari/index')
def view_index():
    return redirect(url_for('view_top'))
    
@my_app.route('/yoshinari/about-us')
def view_about_us():
    return render_template("about-us.html")
    
    
@my_app.route('/yoshinari/reverse')
def view_reverse():
    return render_template("reverse.html")
        
@my_app.route('/yoshinari/is-it-sentence')
def view_is_it_sentence():
    return render_template("is-it-sentence.html")
        
@my_app.route('/yoshinari/random')
def view_random():
    return render_template("random.html")
        
@my_app.route('/yoshinari/db-sample')
def view_db_sample():
    return render_template("db-sample.html")
        