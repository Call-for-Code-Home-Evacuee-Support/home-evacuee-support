function main(params) {
  return {
    params: {
      include_docs: true,
      limit: params.limit,
      skip: params.skip
    }
  };
}
