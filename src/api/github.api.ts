export class GithubApi {
  public static readonly url = "https://api.github.com/";
  
  public static fetchRepositories = (type: "orgs"|"users", name: string) => {
    return fetch(GithubApi.url + type + "/" + name + "/repos", {
      method: "GET"
    });
  }
}