from nltk.corpus import wordnet
import spacy
import re
import nltk
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords


def main(list, list_for_compare):
    result = 0
    for elem in list:
        for elem_for_compare in list_for_compare:
            print('compare ', elem, 'with ', elem_for_compare)
            result += get_equality(elem, elem_for_compare)
            print('current result: ', get_equality(elem, elem_for_compare), 'all result: ', result)
    return result


def remove_punctuation(document):
    punctuation = re.compile(r'[-.,?!:;()|0-9]')
    return punctuation.sub(' ', document)


def get_equality(line, line_for_compare):
    line = remove_punctuation(line)
    line_for_compare = remove_punctuation(line_for_compare)

    line_list = nltk.word_tokenize(line.lower())
    line_for_compare_list = nltk.word_tokenize(line_for_compare.lower())

    [line_list, line_for_compare_list] = get_without_stopword(line_list, line_for_compare_list)
    [line_list, line_for_compare_list] = get_normalize_word(line_list, line_for_compare_list)

    [result, degree_of_comparison] = compare_line(line_list, line_for_compare_list)

    return result


def compare_line(line, line_for_compare):
    line_with_post_tag = [get_word_with_tags(w) for w in line]
    line_for_compare_with_post_tag = [get_word_with_tags(w) for w in line_for_compare]
    word_equality = [0] * len(line_with_post_tag)

    for i in range(len(line_with_post_tag)):
        for j in range(len(line_for_compare_with_post_tag)):
            try:
                w1 = wordnet.synset(line_with_post_tag[i])
                w2 = wordnet.synset(line_for_compare_with_post_tag[j])
                word_equality[i] += w1.wup_similarity(w2)
            except Exception:
                continue
    result = 0
    for elem in word_equality:
        result += elem

    return [result, len(line)]


def get_word_with_tags(word):
    return word + '.' + get_wordnet_pos(word) + '.00'


def get_normalize_word(line, line_for_compare):
    lemmatizer = WordNetLemmatizer()
    res_line = [lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in nltk.word_tokenize(' '.join(line))]
    res_line_for_compare = [lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in
                            nltk.word_tokenize(' '.join(line_for_compare))]

    return [res_line, res_line_for_compare]


def get_without_stopword(line, line_for_compare):
    filename = 'english.txt'
    with open(filename) as f:
        content = f.read().splitlines()

    vocabulary_stopword = set(content)

    res_line = []
    res_line_for_compare = []

    for word in line:
        if word not in vocabulary_stopword:
            res_line.append(word)

    for word in line_for_compare:
        if word not in vocabulary_stopword:
            res_line_for_compare.append(word)

    return [res_line, res_line_for_compare]


def get_wordnet_pos(word):
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}
    return tag_dict.get(tag, wordnet.NOUN)
