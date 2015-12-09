/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

var doc1 = "New York is very nice and very beautiful";
var doc1b = "York New and a is very beautiful nice very"
var doc2 = "I have a very nice evening learning nlp";
var doc2b = "evening very I have learning a nice nlp";

var make_index = function(docs) {
  var index = [];
  for (var i = 0; i < docs.length; i++) {
    var doc = docs[i].split(' ');
    for (var j = 0; j < doc.length; j++ ) {
      if (index.indexOf(doc[j]) < 0) {
        index.push(doc[j]);
      }
    }
  }
  return index;
};

var get_feature_vector = function(doc, index) {
  docvec = [];
  for (var i = 0; i < index.length; i++) {
    var words = ' ' + index[i] + ' ';
    var startwords = '^' + index[i] + ' ';
    var endwords = ' ' + index[i] + '$'
    var all_words = words + '|' + startwords + '|' + endwords;
    var regex_count = new RegExp(all_words, 'g');
    var count = (doc.match(regex_count) || []).length;
    docvec.push(count);
  }
  return docvec;
};

var dotproduct = function(a, b) {
  var n = 0, lim = Math.min(a.length, b.length);
  for (var i = 0; i < lim; i++) { 
    n += a[i] * b[i];
  }
  return n;
};

var vector_length = function(a) {
  var sumsqr = 0; 
  for (var i = 0; i < a.length; i++) { 
    sumsqr += a[i] * a[i]; 
  }
  return Math.sqrt(sumsqr);
};

var cosinus_similarity = function(a, b) {
  var lenght_a = vector_length(a);
  var length_b = vector_length(b);
  return dotproduct(a, b) / (lenght_a / length_b);
};

var get_idf = function(n_docs, n_docs_with_term) {
  return Math.log(n_docs / n_docs_with_term);
}

var get_df = function(term, docs) {
  var count = 0;
  for (var i = 0; i < docs.length; i++) {
    var doc = docs[i];
    if (get_tf(term, doc) > 0) {
      count++;
    }
  }
  return count;
}

var get_tf = function(term, doc) {
  var words = ' ' + term + ' ';
  var startwords = '^' + term + ' ';
  var endwords = ' ' + term + '$'
  var all_words = words + '|' + startwords + '|' + endwords;
  var regex_count = new RegExp(all_words, 'g');
  return (doc.match(regex_count) || []).length;
}

var get_tfidf_feature_vector = function(doc, index, docs) {
  docvec = [];
  for (var i = 0; i < index.length; i++) {
    var tf = get_tf(index[i], doc);
    var df = get_df(index[i], docs);
    var idf = get_idf(docs.length, df);
    var tf_idf = tf * idf;
    docvec.push(tf_idf);
  }
  return docvec;
};



function get_n_gram(terms, n) {
    var t = terms.slice(0); // deep-copy
    var grams = [];
    for (var i=0; i < t.length-n+1; i++) {
      grams.push(t.slice(i, i+n).join('_'));
    }
    return grams;
}

var extend_grams = function(doc, up_to_n) {
  var terms = doc.split(' ');
  var extended = [];
  for (var i = 1; i <= up_to_n; i++) {
    var grams = get_n_gram(terms, i);
    for (var j = 0; j < grams.length; j++) {
      extended.push(grams[j]);
    }
  }
  return extended.join(' ');
}

var testString = "a rose is a rose is a rose";
console.log(testString);
// Shingle words
console.log("Words:", extend_grams(testString, 3));


var index = make_index([doc1, doc2]);
var docvec1 = get_feature_vector(doc1, index);
var tf_idf1 = get_tfidf_feature_vector(doc1, index, [doc1, doc2]);
var docvec1b = get_feature_vector(doc1b, index);
//var two_gram = extend_grams(doc1);
//console.log(two_gram);

var docvec2 = get_feature_vector(doc2, index);
var docvec2b = get_feature_vector(doc2b, index);

var sim = cosinus_similarity(docvec1, docvec2);
var simb = cosinus_similarity(docvec1b, docvec2b);

var d1 = 'My little brother is a genious, he just figured out ' +
           'how to build the hoverboard!';
var d2 = 'There is the rumor that the father of my half brother ' +
           'is a famous actor.';
var d3 = 'Math was his beloved subject until he had a very bad ' +
           'teacher.';
var d4 = 'When my father was young, there were different times. ' +
           'Even the internet was not invented jet!'
var corpus = [d1, d2, d3, d4];

var preprocess_corpus = function(corpus, to_n_gram) {
  var cleaned = [];
  for (var i=0; i < corpus.length; i++) {
    var doc = corpus[i].replace(/[^\w\s]/gi, '') // clean specialchars
    // doc = remove_stopwords(doc);
    // doc = stemming(doc);
    doc = extend_grams(doc, to_n_gram);
    cleaned.push(doc);
  }
  return cleaned;
}

corpus = preprocess_corpus(corpus, 3);
var index = make_index(corpus);

var search_query = 'brother father';

var search_in_corpus = function(query, index, corpus) {
  var qv = get_tfidf_feature_vector(query, index, corpus);
  var most_similar = 0.;
  var most_similar_doc = '';
  for (var i=0; i < corpus.length; i++) {
    var dv = get_tfidf_feature_vector(corpus[i], index, corpus);
    var sim = cosinus_similarity(qv, dv);
    if (sim > most_similar) {
      most_similar = sim;
      most_similar_doc = corpus[i];
    }
  }
  console.log(most_similar);
  return most_similar_doc;
}

console.log('serach', search_in_corpus(search_query, index, corpus));


//console.log(index);
//console.log(docvec1);
console.log(tf_idf1);

//console.log(docvec2);

//console.log(sim);
//console.log(simb);


//console.log(make_index([doc1, doc2]));
//console.log(doc1.split(' '));
var index = ["New", "York", "is", "very", "nice", "and", "bautiful",
         "I", "have", "a", "evening", "learning", "nlp"];

/*
Exception: ReferenceError: doc is not defined
@Scratchpad/1:27:1
*/
/*
Exception: TypeError: index.append is not a function
make_index@Scratchpad/1:20:9
@Scratchpad/1:27:13
*/
/*
Exception: SyntaxError: missing ; after for-loop condition
@Scratchpad/1:29
*/
/*
Exception: SyntaxError: missing ) in parenthetical
@Scratchpad/1:31
*/
/*
Exception: TypeError: index is undefined
get_feature_vector@Scratchpad/1:29:19
@Scratchpad/1:38:14
*/
/*
Exception: TypeError: index is undefined
get_feature_vector@Scratchpad/1:29:19
@Scratchpad/1:38:14
*/
/*
Exception: TypeError: doc.match(...) is null
get_feature_vector@Scratchpad/1:31:17
@Scratchpad/1:38:14
*/
/*
Exception: TypeError: doc.match(...) is null
get_feature_vector@Scratchpad/1:31:17
@Scratchpad/1:38:14
*/
/*
Exception: TypeError: doc.match(...) is null
get_feature_vector@Scratchpad/1:31:17
@Scratchpad/1:38:14
*/
/*
Exception: TypeError: idf is not a function
get_tfidf_feature_vector@Scratchpad/1:93:15
@Scratchpad/1:102:15
*/
/*
Exception: SyntaxError: missing ; before statement
@Scratchpad/1:102
*/
/*
Exception: ReferenceError: term is not defined
add_2_gram@Scratchpad/1:104:5
@Scratchpad/1:115:16
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:135:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:136:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:133:5
extends_grams@Scratchpad/1:115:1
@Scratchpad/1:126:23
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:133:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:132:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:132:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:132:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:132:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:132:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:133:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:134:5
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:134:5
*/
/*
Exception: ReferenceError: j is not defined
extends_grams@Scratchpad/1:115:5
@Scratchpad/1:126:23
*/
/*
Exception: ReferenceError: add_2_gram is not defined
@Scratchpad/1:133:5
*/
/*
Exception: SyntaxError: missing ; before statement
@Scratchpad/1:169
*/
/*
Exception: ReferenceError: extend_grams is not defined
preprocess_corpus@Scratchpad/1:158:5
@Scratchpad/1:164:10
*/
/*
Exception: ReferenceError: cleand is not defined
preprocess_corpus@Scratchpad/1:159:5
@Scratchpad/1:164:10
*/
/*
Exception: ReferenceError: extends_grams is not defined
@Scratchpad/1:126:1
*/
/*
Exception: TypeError: corpus[i] is undefined
preprocess_corpus@Scratchpad/1:155:9
@Scratchpad/1:164:10
*/
/*
Exception: TypeError: doc is undefined
get_tf@Scratchpad/1:85:3
get_tfidf_feature_vector@Scratchpad/1:91:14
search_in_corpus@Scratchpad/1:174:14
@Scratchpad/1:186:13
*/