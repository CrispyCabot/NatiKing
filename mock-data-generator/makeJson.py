from faker import Faker
import random
import string

# {
#     "_id": {
#         "$oid": "61e04b559ffc7a5928843f65"
#     },
#     "email": "emai@email.com",
#     "password": "password",
#     "is_admin_user": false,
#     "name": "Bobby bob",
#     "access_level": 1,
#     "socials": [{"username": "bobby", "url": "bobby.twitter"}]
# }
user_ids = []
post_ids = []
masterID = '23836b6474cfc3232ad95e1e'
all_ids = [masterID]
NUM_USERS = 20
NUM_POSTS = 40
TOTAL = NUM_USERS + NUM_POSTS

def main():
    global post_ids
    for _ in range(TOTAL-1):
        all_ids.append(makeID())
    actual_ids = list(set(all_ids))
    for _ in range(NUM_USERS):
        user_ids.append(actual_ids.pop())
    post_ids = actual_ids.copy()

    makeUsers(len(user_ids))
    makePosts(len(post_ids))

def makeUsers(amt):
    outFile = open("users.json", "w")
    outFile.write('[')

    template = """{
    "_id": {
        "$oid": "ID_PLACEHOLDER"
    },
    "email": "NAME2_PLACEHOLDER@email.com",
    "password": "password123",
    "is_admin_user": false,
    "name": "NAME_PLACEHOLDER",
    "access_level": {
        "$numberInt": "1"
    },
    "socials": [{
        "username": "NAME2_PLACEHOLDER",
        "url": "twitter.com/NAME2_PLACEHOLDER"
    }]
    },"""
    firstUser = """{
    "_id": {
        "$oid": "23836b6474cfc3232ad95e1e"
    },
    "email": "cbridewell5@gmail.com",
    "password": "password123",
    "is_admin_user": true,
    "name": "Chris Bridewell",
    "access_level": {
        "$numberInt": "3"
    },
    "socials": [{
        "username": "cbridewell",
        "url": "twitter.com/cbridewell"
    }]
    },"""
    outFile.write(firstUser)
    fake = Faker()
    for i in range(amt):
        name = fake.name();
        id = user_ids[i]
        user = template.replace('ID_PLACEHOLDER', id)
        user = user.replace("NAME2_PLACEHOLDER", name.replace(' ', ''))
        user = user.replace("NAME_PLACEHOLDER", name)
        if i == amt-1:
            user=user[0:-1]
        outFile.write(user)
    outFile.write(']')

def makePosts(amt):
    global post_ids
    outFile = open("posts.json", "w")
    outFile.write("[")

    template = '''
    {
    "_id": {
        "$oid": "ID_PLACEHOLDER"
    },
    "owner_id": {
        "$oid": "OWNER_PLACEHOLDER"
    },
    "title": "TITLE_PLACEHOLDER",
    "description": "DESC_PLACEHOLDER",
    "likes": [{
        "$oid": "LIKE_PLACEHOLDER"
    }],
    "tags": ["reds"],
    "comments": [{
        "user_id": {
            "$oid": "COMMENT_PLACEHOLDER"
        },
        "comment": "Thaat was epic bro"
    }]
    },'''

    fake = Faker()
    for i in range(amt):
        title = fake.job()
        description = fake.text().replace("\n", '')
        post = template.replace("TITLE_PLACEHOLDER", title)
        post = post.replace("ID_PLACEHOLDER", post_ids[i])
        post = post.replace("OWNER_PLACEHOLDER", masterID)
        post = post.replace("DESC_PLACEHOLDER", description)
        post = post.replace("LIKE_PLACEHOLDER", random.choice(user_ids))
        post = post.replace("COMMENT_PLACEHOLDER", random.choice(user_ids))
        if i == amt-1:
            post=post[0:-1]
        outFile.write(post)
    outFile.write(']')

def makeID():
    letters = 'abcdef'
    return ''.join(random.choice(letters + string.digits) for _ in range(24))

main()