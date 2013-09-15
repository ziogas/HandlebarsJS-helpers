//Better loop with magic attributes
Handlebars.registerHelper ( 'loop', function ( context, options ) {

    var ret = '';

    if ( context )
    {
        if ( context instanceof Array && context.length < 1 )
        {   
            ret = options.inverse ( ret );
        }
        else
        {
            var i = 0;
            for ( var attr in context ) 
            {
                if ( attr.indexOf ( '__' ) === 0 )
                {
                    continue;
                }

                if ( typeof context [ attr ] == "string" )
                {
                    context [ attr ] = { value: context [ attr ] };
                }

                context [ attr ] [ '__key' ] = attr; 
                context [ attr ] [ '__pos' ] = i++;
                ret = ret + options.fn ( context [ attr ] );
            }
        }
    }
    else
    { 
        ret = options.inverse ( ret );
    }

    return ret;
});

//"IF" style function 
Handlebars.registerHelper ( 'check', function(arg1, arg2, options) {

    if ( arg1 == arg2 )
    {
        return options.fn(this);
    }
    else
    {
        return options.inverse(this);
    }
});

//"IF" style function
Handlebars.registerHelper ( 'checknot', function(arg1, arg2, options) {
   return Handlebars.helpers['check'].call(this, arg1, arg2, { fn: options.inverse, inverse: options.fn });
});

//"IF" style function
Handlebars.registerHelper ( 'indexOfZero', function( stack, needle, options) {

    if ( stack && stack.indexOf ( needle ) === 0 )
    {
        return options.fn(this);
    }
    else
    {
        return options.inverse(this);
    }
});

//"IF" style function
Handlebars.registerHelper ( 'haskey', function( arr, key, options) {

    if ( arr && arr [ key ] )
    {
        return options.fn(this);
    }
    else
    {
        return options.inverse(this);
    }
});

//Quick "IF"
Handlebars.registerHelper ( 'eq', function( arg1, arg2, ok, bad ) { 

    if ( arg1 == arg2 )
    {
        return new Handlebars.SafeString ( ok );
    }

    return new Handlebars.SafeString ( bad );
} );

//Returns default if false
Handlebars.registerHelper ( 'def', function ( val, def ) {

    if ( !val )
    {
        return new Handlebars.SafeString ( def );
    }

    return new Handlebars.SafeString ( val );
} );

//Truncates string
Handlebars.registerHelper ( 'truncate', function ( str, len ) {

    if (str.length > len) {
        var new_str = str.substr ( 0, len+1 );

        while ( new_str.length )
        {
            var ch = new_str.substr ( -1 );
            new_str = new_str.substr ( 0, -1 );

            if ( ch == ' ' )
            {
                break;
            }
        }

        if ( new_str == '' )
        {
            new_str = str.substr ( 0, len );
        }

        return new Handlebars.SafeString ( new_str +'...' ); 
    }
    return str;
} );

//Use this with caution! Assign variable from template
Handlebars.registerHelper ( 'assign', function () {

    var args = [];
    for ( var i=1,len=arguments.length; i<=len; i++)
    {
        if ( typeof ( arguments [ i ] ) === 'string' )
        {
            args [ args.length ] = arguments [ i ];
        }
    }

    Handlebars.registerHelper ( arguments [ 0 ], args.join ( '' ) );
    return '';
} );

//Use this with caution! Unsets variable from template
Handlebars.registerHelper ( 'unset', function ( variable ) {
    Handlebars.registerHelper ( variable, undefined );
    return '';
} );

Handlebars.registerHelper ( 'br2nl', function( str ) {
    return new Handlebars.SafeString ( str.replace ( /<br\s?\/?>/g, "\n" ) );
});

Handlebars.registerHelper ( 'nl2br', function ( str ) { 

    return new Handlebars.SafeString ( str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2') );
} );

Handlebars.registerHelper ( 'dirname', function( str, assign ) { 

    if ( str.indexOf ( '/' ) != 0 )
    { 
        str = '/' + str;
    }

    if ( typeof assign == 'string' )
    {
        return Handlebars.helpers['assign'].call(this, assign, str.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') );
    }
    else
    {       
        return new Handlebars.SafeString ( str.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') );
    }
} );

//(name, num) or (num)
Handlebars.registerHelper ( 'inc', function() { 

    if ( arguments.length < 3 ) {
        return new Handlebars.SafeString ( parseInt ( arguments [ 0 ], 10 ) + 1 );
    } else { 
        var num = 0;
        if ( arguments [ 1 ] !== undefined ){ 
        
            num = ( parseInt ( Number ( arguments [ 1 ] ), 10 ) + 1 );
        }

        Handlebars.registerHelper ( arguments [ 0 ], num.toString () );

        return '';
    }
} );

Handlebars.registerHelper ( 'join', function( arr, str ) { 
    return new Handlebars.SafeString ( arr.join(str) );
} );

Handlebars.registerHelper ( 'ampify', function( str ) { 
    
    if ( str && str != undefined )
    { 
        if ( !( typeof ( str ) == 'string' && isNaN( str ) ) )
        {
            str = str.toString();
        }

        return new Handlebars.SafeString ( str.replace ( /&/g, '&amp;' ) );
    }

    return '';
} );

Handlebars.registerHelper ( 'entities_encode', function( str ) { 
    
    if ( str && str != undefined )
    { 
        if ( !( typeof ( str ) == 'string' && isNaN( str ) ) )
        {
            str = str.toString();
        }

        return new Handlebars.SafeString ( str.replace ( /&/g, '&amp;' ).replace ( /</g, '&lt;' ).replace ( />/g, '&gt;' ) );
    }

    return '';
} );

Handlebars.registerHelper ( 'entities_encode_unsafe', function( str ) { 
    
    if ( str && str != undefined )
    { 
        if ( !( typeof ( str ) == 'string' && isNaN( str ) ) )
        {
            str = str.toString();
        }

        return str.replace ( /&/g, '&amp;' );
    }
    
    return '';
    
} );

Handlebars.registerHelper ( 'entities_decode', function( str ) { 
    if ( str && str != undefined )
    { 
        return new Handlebars.SafeString ( str.replace ( /&amp;/g, '&' ) );
    }

    return '';
} );

Handlebars.registerHelper ( 'strip_tags', function( str ) { 
    if ( str && str != undefined )
    { 

        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi,
            allowed = '';

        if ( str.replace ){ 
        
            str = str.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
                return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
        }

        return new Handlebars.SafeString ( str );
    }

    return '';
} );

Handlebars.registerHelper ( 'log', function( obj ) { 
    console.log ( obj );
    return '';
} );


Handlebars.registerHelper ( 'akey', function(  ) {

    var name = arguments [ 0 ];
    var arr = arguments [ 1 ];

    for ( var i=2,len=arguments.length; i<len; i++)
    {
        if ( typeof ( arguments [ i ] ) == 'string' && arr != undefined ) 
        {
            arr = arr [ arguments [ i ] ];
        }
    }

    return Handlebars.registerHelper ( name, arr );
});

Handlebars.registerHelper ( 'getkey', function(  ) {

    var name = arguments [ 0 ];
    var arr = arguments [ 1 ];

    for ( var i=2,len=arguments.length; i<len; i++)
    {
        if ( typeof ( arguments [ i ] ) == 'string' && arr != undefined ) 
        {
            arr = arr [ arguments [ i ] ];
        }
    }

    return arr;
});

Handlebars.registerHelper ( 'substr', function( str, arg1, arg2 ) { 
    return new Handlebars.SafeString ( str.substr(arg1, arg2) ); 
    
} );

Handlebars.registerHelper ( 'timestamp', function( str ) {
    return new Handlebars.SafeString ( new Date().getTime() );
});

Handlebars.registerHelper ( 'partial', function ( part ) { 

    return new Handlebars.SafeString ( Handlebars.VM.invokePartial(Handlebars.partials [ part ], part, this, Handlebars.helpers, Handlebars.partials ) );
} );
