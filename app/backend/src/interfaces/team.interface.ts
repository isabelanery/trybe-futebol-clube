import Match from './match.interface';

export default interface Team {
  id: number,
  teamName: string,
  homeMatches: Match[],
  awayMatches: Match[],
}
