from app import app_
from flask import render_template, redirect, url_for
    
    
@app_.route('/yoshinari')
def view_top():
    return render_template("index.html")

@app_.route('/yoshinari/index')
def view_index():
    return redirect(url_for('view_top'))
    
@app_.route('/yoshinari/about-us')
def view_about_us():
    return render_template("about-us.html")
    
    
@app_.route('/yoshinari/reverse')
def view_reverse():
    return render_template("reverse.html")
        
@app_.route('/yoshinari/is-it-sentence')
def view_is_it_sentence():
    return render_template("is-it-sentence.html")
        
@app_.route('/yoshinari/random')
def view_random():
    return render_template("random.html")
        
@app_.route('/yoshinari/db-sample')
def view_db_sample():
    return render_template("db-sample.html")
        