import nltk
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
punctuation = ('.', ',', ':', '!', '?', '-', ';')
#nltk.download('ruwordnet')
def get_wordnet_pos(word):
    """Map POS tag to first character lemmatize() accepts"""
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}
    return tag_dict.get(tag, wordnet.NOUN)


def get_word(word):
    """Map POS tag to first character lemmatize() accepts"""
    word = word.lower()
    if word in stopwords.words('russian') or word in punctuation:
        return

    word = lemmatizer.lemmatize(word, get_wordnet_pos(word))
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}

    return word + '.' + tag_dict.get(tag, wordnet.NOUN) + '.' + '00'


lemmatizer = WordNetLemmatizer()

sentence = "мама учит человека"
sentence1 = "мама учит парня"

res = [get_word(w) for w in nltk.word_tokenize(sentence) if get_word(w) is not None]
res = list(set(res))
res_len = len(res)

res1 = [get_word(w) for w in nltk.word_tokenize(sentence1) if get_word(w) is not None]
res1 = list(set(res1))
res1_len = len(res1)

for i in range(min([res_len, res1_len])):
    for j in range(min([res_len, res1_len])):
        if res[i].split('.')[-2] == res1[j].split('.')[-2]:
            print(res[i], res1[j])
            try:
                w1 = wordnet.synset(res[i])  # v here denotes the tag verb
                w2 = wordnet.synset(res1[j])
                print(w1.wup_similarity(w2))
            except Exception:
                continue

w1 = wordnet.synset('человек.n.00')  # v here denotes the tag verb
w2 = wordnet.synset('парень.n.00')
print(w1.wup_similarity(w2))



