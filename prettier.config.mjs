import config from "@lazy-and-focused/prettier-config";

// Re-export shared configuration but override singleQuote per project preference
const custom = {
  ...config,
  singleQuote: false,
  jsxSingleQuote: false,
};

export default custom;
