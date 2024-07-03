export default interface IGameService {
  getGamesByTagId(): Promise<GameAPIResponse[]>;
}
