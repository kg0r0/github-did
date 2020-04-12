const jsonld = require("jsonld");
// const resolver = require("./resolver");

const _nodejs =
  // tslint:disable-next-line
  typeof process !== "undefined" && process.versions && process.versions.node;
const _browser =
  // tslint:disable-next-line
  !_nodejs && (typeof window !== "undefined" || typeof self !== "undefined");

const documentLoader = _browser
  ? jsonld.documentLoaders.xhr()
  : jsonld.documentLoaders.node();

const wrappedDocumentLoader = args => {
  return async url => {
    // TODO: handle DIDs...

    if (url.startsWith("https://w3id.org/did/v1")) {
      return documentLoader(
        "https://w3c-ccg.github.io/did-spec/contexts/did-v1.jsonld"
      );
    }

    if (url.startsWith("https://w3id.org/identity/v1")) {
      return documentLoader(
        "https://web-payments.org/contexts/identity-v1.jsonld"
      );
    }

    return documentLoader(url);
  };
};

module.exports = wrappedDocumentLoader;
