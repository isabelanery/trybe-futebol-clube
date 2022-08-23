import Match from './match.interface';

export default interface LeaderboardTeam {
  id: number,
  teamName: string,
  homeMatche: Match[],
  awayMatches: Match[],
}
