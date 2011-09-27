Handlebars.registerHelper ( 'loop', function ( context, fn, inverse) {
    var ret = "";

    if ( context )
    {
        if ( context instanceof Array && context.length < 1 )
        {
            ret = inverse ( ret );
        }
        else
        {
            var i = 0;
            for ( var attr in context )
            {
                context [ attr ] [ '__key' ] = attr;
                context [ attr ] [ '__pos' ] = i++;
                ret = ret + fn ( context [ attr ] );
            }
        }
    }
    else
    {
        ret = inverse ( ret );
    }

    return ret;
});

Handlebars.registerHelper ( 'check', function(  arg1, arg2, fn, inverse ) {

    if ( !arg2 )
    {
        return Handlebars.helpers['if'].call(this, arg1, fn, inverse);
    }

    if ( arg1 == arg2 )
    {
        return fn(this);
    }
    else
    {
        return inverse(this);
    }
});

Handlebars.registerHelper ( 'checknot', function(arg1, arg2, fn, inverse) {

   return Handlebars.helpers['check'].call(this, arg1, arg2, inverse, fn);
});

Handlebars.registerHelper ( 'eq', function( arg1, arg2, ok, bad ) {

    if ( arg1 == arg2 )
    {
        return new Handlebars.SafeString ( ok );
    }

    return new Handlebars.SafeString ( bad );
} );

Handlebars.registerHelper ( 'def', function ( val, def ) {

    if ( !val )
    {
        return new Handlebars.SafeString ( def );
    }

    return new Handlebars.SafeString ( val );
} );

Handlebars.registerHelper ( 'truncate', function ( str, len ) {

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
} );

//Use this with caution
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
