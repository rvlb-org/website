// قائمة سوداء شاملة للنطاقات المؤقتة والمزيفة
export const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com','guerrillamail.com','guerrillamail.net','guerrillamail.org',
    'guerrillamail.biz','guerrillamail.de','guerrillamail.info','guerrillamailblock.com',
    'tempmail.com','temp-mail.org','temp-mail.io','throwam.com','throwam.net',
    '10minutemail.com','10minutemail.net','10minutemail.org','10minutemail.de',
    '10minutemail.co.uk','10minutemail.co.za','10minutemail.info','10minutemail.nl',
    'yopmail.com','yopmail.fr','yopmail.net','cool.fr.nf','jetable.fr.nf',
    'nospam.ze.tc','nomail.xl.cx','mega.zik.dj','speed.1s.fr','courriel.fr.nf',
    'moncourrier.fr.nf','monemail.fr.nf','monmail.fr.nf',
    'sharklasers.com','grr.la','spam4.me',
    'trashmail.com','trashmail.at','trashmail.io','trashmail.me',
    'trashmail.net','trashmail.org','trashmail.xyz','trashmailer.com',
    'mailnull.com','spamgourmet.com','spamgourmet.net','spamgourmet.org',
    'mailnesia.com','spamfree24.org','spamfree24.de','spamfree24.eu',
    'spamfree24.info','spamfree24.net','spamfree24.com',
    'dispostable.com','discard.email','filzmail.com','fakeinbox.com',
    'maildrop.cc','spamspot.com','spam.la','anonaddy.com',
    'simplelogin.io','33mail.com','spamgobbler.com','meltmail.com',
    'mintemail.com','mt2009.com','mt2014.com','mytempemail.com','mytrashmail.com',
    'neomailbox.com','nepwk.com','nervmich.net','nervtmich.net',
    'netmails.com','netmails.net','netzidiot.de','neverbox.com',
    'nmail.cf','no-spam.ws','nobulk.com','nomail2me.com',
    'nomorespamemails.com','nospamfor.us','nospamthanks.info','notmailinator.com',
    'nowmymail.com','mohmal.com','getairmail.com','fakemailgenerator.com',
    'crazymailing.com','mailinator2.com','spamherelots.com','spamhereplease.com',
    'spamthisplease.com','spaml.com','spaml.de','spamoff.de','spamqc.com',
    'emailtemporaire.fr','jetable.org','jetable.net','jetable.com','jetable.de',
    'jetable.eu','temporaryemail.net','temporaryforwarding.com','temporaryinbox.com',
    'throwme.com','trbvm.com','trbvn.com','turual.com','twinmail.de',
    'tyldd.com','uggsrock.com','uroid.com','valemail.net',
    'mailbolt.com','maileater.com','mailexpire.com','mailforspam.com',
    'mailin8r.com','mailinater.com','mailincubator.com','mailismagic.com',
    'mailme.ir','mailme24.com','mailmetrash.com','mailmoat.com','mailnew.com',
    'mailsiphon.com','mailslite.com','mailzilla.com','mailzilla.org',
    'e4ward.com','emailmiser.com','emailsensei.com','emailtemporanea.com',
    'emailtemporanea.net','emailtemporanea.org','emailthe.net','emailtmp.com',
    'emailwarden.com','emailx.at.hm','emailxfer.com','emkei.cz','ephemail.net',
    'fakeinformation.com','fivemail.de','fleckens.hu','fr33mail.info','frapmail.com',
    'freeinbox.cyou','freeletter.me','freemail.ms','freemails.ms','freemailzam.com',
    'fudgerub.com','fwdisp.net','garbagemail.org','gedmail.win',
    'gelitik.in','get1mail.com','getairmail.cf','getairmail.ga','getairmail.gq',
    'getairmail.ml','getairmail.tk','gettempemail.com','gett.icu','gishpuppy.com',
    'gmailbox.org','goemailbox.com','gotmail.com','gotmail.net','gotmail.org',
    'grandmamail.com','grandmasmail.com','great-host.in','greensloth.com',
    'gsrv.co.uk','guerillamail.biz','guerillamail.com','guerillamail.de',
    'guerillamail.info','guerillamail.net','guerillamail.org',
    'hatespam.org','herp.in','hidemail.de','hmamail.com','hopemail.biz',
    'ieatspam.eu','ieatspam.info','ihateyoualot.info','iheartspam.org',
    'imails.info','inbax.tk','inbox.si','inboxalias.com','incognitomail.com',
    'incognitomail.net','incognitomail.org','inoutmail.de','inoutmail.eu',
    'inoutmail.info','inoutmail.net','insorg-mail.info','instant-mail.de',
    'internet-e-mail.de','internet-mail.org','internetemails.net','internetmailing.net',
    'jetable.com.ar','jnxjn.com','joelpet.com','junk1.tk','junkmail.gq',
    'junkmail.info','kasmail.com','kaspop.com','keepmymail.com','killmail.com',
    'killmail.net','klassmaster.com','klassmaster.net','klassmaster.org',
    'klzlk.com','koszmail.pl','kurzepost.de','letthemeatspam.com',
    'lhsdv.com','lifebyfood.com','link2mail.net','litedrop.com','lol.ovpn.to',
    'lookugly.com','lopl.co.cc','lortemail.dk','lovemeleaveme.com',
    'lr78.com','lroid.com','lukop.dk','m21.cc','mail-filter.com',
    'mail-temporaire.fr','mail.by','mail.mezimages.net','mail.zp.ua',
    'mail1a.de','mail2rss.org','mail333.com','mailbidon.com','mailbiz.biz',
    'mailblocks.com','mailbucket.org','mailcat.biz','mailcatch.com',
    'mailde.de','mailde.info','maildu.de','maileimer.de',
    'mailfreeonline.com','mailguard.me','mailhazard.com','mailhazard.us',
    'mailimate.com','mailin8r.com','mailjet.top',
]);

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return new Response(JSON.stringify({ error: "INVALID_REQUEST" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const { email, turnstileToken } = body;

        // 0. التحقق من صحة التوكن البشري (Turnstile)
        const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
        
        const turnstileFormData = new FormData();
        turnstileFormData.append('secret', TURNSTILE_SECRET_KEY);
        turnstileFormData.append('response', turnstileToken || '');
        turnstileFormData.append('remoteip', request.headers.get('CF-Connecting-IP') || '');

        const turnstileVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: turnstileFormData
        });

        const turnstileOutcome = await turnstileVerify.json();
        if (!turnstileOutcome.success) {
            return new Response(JSON.stringify({ error: "BOT_DETECTED" }), { 
                status: 403, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

        // 1. التحقق الصارم من الإيميل على مستوى الخادم
        // رفض أي مدخل يحتوي على أحرف خبيثة (Null Bytes, control chars)
        if (!email || typeof email !== 'string' || email.length > 320) {
            return new Response(JSON.stringify({ error: "INVALID_EMAIL_FORMAT" }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        // رفض Null Bytes وأحرف التحكم
        if (/[\x00-\x1F\x7F<>'"\\]/.test(email)) {
            return new Response(JSON.stringify({ error: "INVALID_EMAIL_FORMAT" }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const emailRegex = /^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: "INVALID_EMAIL_FORMAT" }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 1.5 التحقق من النطاق ضد القائمة السوداء
        const emailDomain = email.split('@')[1]?.toLowerCase();
        if (!emailDomain || DISPOSABLE_DOMAINS.has(emailDomain)) {
            return new Response(JSON.stringify({ error: "DISPOSABLE_EMAIL" }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. قراءة المتغيرات السرية
        const supabaseUrl = env.SUPABASE_URL;
        const supabaseKey = env.SUPABASE_SERVICE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return new Response(JSON.stringify({ error: "SERVER_CONFIG_ERROR" }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2.5 جلب بيانات الدولة والـ IP من شبكة Cloudflare
        const country = request.cf?.country || 'UNKNOWN';
        const clientIp = request.headers.get('CF-Connecting-IP') || 'UNKNOWN';

        // 3. الاتصال المباشر بـ Supabase من الخادم الخلفي
        const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ email: email, country: country, ip_address: clientIp })
        });

        if (!response.ok) {
            const errorText = await response.text();
            if (errorText.includes('23505') || errorText.includes('duplicate key')) {
                return new Response(JSON.stringify({ error: "ALREADY_REGISTERED" }), { 
                    status: 409,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            throw new Error('Supabase API Error');
        }

        return new Response(JSON.stringify({ success: true }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "INTERNAL_SERVER_ERROR" }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
