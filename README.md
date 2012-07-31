HandlebarsJS helpers
==============

Several helpers for you to help working with handlebarsjs (https://github.com/wycats/handlebars.js/) 
Tested and working on 1.0.beta.2

DOWNLOAD
--------------
You could checkout latest version with:

    $ git clone git://github.com/ziogas/HandlebarsJS-helpers


INSTALL
--------------
Just copy-paste the script.js content to your code after including handlebars.js


USAGE
--------------

[#loop]
some_object = { foo: { firstname: 'John', lastname: 'Johnson' }, bar: { firstname: 'Peter', lastname: 'Parker' } };

with: 

{{#loop some_object}}
    {{__key}}: {{firstname}} - {{lastname}}<br />
{{/loop}}

will print:

foo: John Johnson<br/>
bar: Peter Parker<br />


[#check]
{{#check variable "xx" }}
    do something if variable is equal to "xx"
{{else}}
    do something if variable is not equal to "xx"
{{/check}}


[#checknot]
The same as #check just opposite


[#eq]
<a href='{{eq variable "xx" "there_is_xx_link" "there_is_not_xx_link"}}'>link</a>


[#def]
<div>{{def variable "default_value"}}</div>


[#truncate]
<div>{{truncate "some very long text" 10}}</div>


[#assign]
Attention, the following helper is some kind of workaround, do not use this function unless you know what are you doing and you really need this.

foo=bar

{{assign "tmp_var" "this " "is " "some " "combined " "string " "with " foo " variable" }} 

will make tmp_var="this is some combined string with bar variable"


You can see and examine other functions in script.js


LICENSE
--------------
MIT


AUTHORS
-------------
Arminas Žukauskas <arminas ( at ) jojo ( dot ) lt>
