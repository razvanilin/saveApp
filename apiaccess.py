from requests_oauthlib import OAuth1Session
import json

client_key = 'wpllfrtcatqu3cfsz32y4ydc3u5swz1as1sujogt'
client_secret = 'o3wib4ud05ozeyjxrf5vwu3oz4qnj24ooglsbcfm'
resource_owner_key = 'HS0FZARMCULIXKEJAAL2BHS5ASA0H0YBYOIPK1RJ'
resource_owner_secret = 'XE2MFMFO1HKGSRON2SVETQ3LYFDT00GZIBOB5RSZ'

base_url = "https://rbs.openbankproject.com"

oauth = OAuth1Session(client_key,
                           client_secret=client_secret,
                           resource_owner_key=resource_owner_key,
                           resource_owner_secret=resource_owner_secret)
# >>> r = oauth.get(protected_url)
our_bank = 'rbs'
r = oauth.get(u"{}/obp/v1.4.0/accounts".format(base_url))

base_url = "https://rbs.openbankproject.com"

accounts = r.json()['accounts']
for a in accounts:
    print a['label']