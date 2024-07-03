import IGameService from "../interfaces/iGameService";
import { GameAPIResponse } from "../helpers/types";
import fetchService from "./fetchService";

export default class GameService implements IGameService {
  private tagId: string;
  private page: number;

  constructor(tagId: string, page: number) {
    this.tagId = tagId;
    this.page = page;
  }

  async getGamesByTagId(): Promise<GameAPIResponse[]> {
    const selectedTags = await fetchService.getGamesByTagsId(
      this.tagId,
      this.page
    );
    return selectedTags;
  }
}
