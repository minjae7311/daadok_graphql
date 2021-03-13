import { Resolvers } from "../../../types/resolvers";
import {
  SearchBrandResponse,
  SearchBrandQueryArgs,
} from "../../../types/graph";
import Seller from "../../../entities/Seller";
const winston = require("../../../config/winston");

const resolvers: Resolvers = {
  Query: {
    SearchBrand: async (
      _res,
      args: SearchBrandQueryArgs,
      { req }
    ): Promise<SearchBrandResponse> => {
      const { search } = args;

      try {
        const brand = await Seller.find({});

        // searh example KMP method
        const buildPatternTable = (word) => {
          const patternTable = [0];
          let prefixIndex = 0;
          let suffixIndex = 1;

          while (suffixIndex < word.length) {
            if (word[prefixIndex] === word[suffixIndex]) {
              patternTable[suffixIndex] = prefixIndex + 1;
              suffixIndex++;
              prefixIndex++;
            } else if (prefixIndex === 0) {
              patternTable[suffixIndex] = 0;
              suffixIndex++;
            } else {
              prefixIndex = patternTable[prefixIndex - 1];
            }
          }

          return patternTable;
        };

        const KMP = (text, word) => {
          if (word.length === 0) {
            return 0;
          }

          let textIndex = 0;
          let wordIndex = 0;

          const patternTable = buildPatternTable(word);

          while (textIndex < text.length) {
            if (text[textIndex] === word[wordIndex]) {
              if (wordIndex === word.length - 1) {
                return textIndex - word.length + 1;
              }
              wordIndex++;
              textIndex++;
            } else if (wordIndex > 0) {
              wordIndex = patternTable[wordIndex - 1];
            } else {
              wordIndex = 0;
              textIndex++;
            }
          }

          return -1;
        };

        const searchBrand = [...brand];
        const brandSearch = searchBrand
          .map((item) => {
            if (KMP(item.brandName, search) >= 0) {
              return item;
            }

            return brandSearch;
          })
          .filter((item) => {
            return item !== undefined;
          });

        const searchtitle = [...brand];
        const titleSearch = searchtitle
          .map((item) => {
            if (KMP(item.title, search) >= 0) {
              return item;
            }

            return titleSearch;
          })
          .filter((item) => {
            return item !== undefined;
          });

        const searchHash = [...brand];
        const hashSearch = searchHash
          .map((item) => {
            if (KMP(item.hash_tag, search) >= 0) {
              return item;
            }

            return hashSearch;
          })
          .filter((item) => {
            return item !== undefined;
          });

        const searchResult = [...brandSearch, ...titleSearch, ...hashSearch];
        const duplicate = searchResult.reduce(function (acc, current) {
          if (acc.findIndex(({ id }) => id === current.id) === -1) {
            acc.push(current);
          }
          return acc;
        }, []);

        return {
          ok: true,
          error: null,
          seller: duplicate,
        };
      } catch (e) {
        winston.info("Get-SearchBrand : "+e.message);
        return {
          ok: false,
          error: e.message,
          seller: null,
        };
      }
    },
  },
};

export default resolvers;
