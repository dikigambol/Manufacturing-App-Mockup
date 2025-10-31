export const setDataSources = (data) => {
  localStorage.setItem("dataSources", JSON.stringify(data));
  window.dispatchEvent(new Event("dataSourcesUpdated"));
};
