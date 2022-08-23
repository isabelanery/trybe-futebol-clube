import Team from '../interfaces/team.interface';
import Leaderboard from '../interfaces/leaderboard.interface';
import TeamModel from '../database/models/team.model';
import Matches from '../database/models/matches.model';
import Match from '../interfaces/match.interface';

export default class LeaderboardService {
  private static homeMatchesData = (match: Match) => {
    const verifyDraw = match.awayTeamGoals === match.homeTeamGoals ? 1 : 0;
    const matchPoints = match.awayTeamGoals > match.homeTeamGoals ? 3 : verifyDraw;

    const data = {
      matchPoints,
      goalsFavor: match.homeTeamGoals,
      goalsOwn: match.awayTeamGoals,
      goalsBalance: match.homeTeamGoals - match.awayTeamGoals,
    };

    return data;
  };

  private static awayMatchesData = (match: Match) => {
    const verifyDraw = match.awayTeamGoals === match.homeTeamGoals ? 1 : 0;
    const matchPoints = match.awayTeamGoals > match.homeTeamGoals ? 3 : verifyDraw;

    const data = {
      matchPoints,
      goalsFavor: match.awayTeamGoals,
      goalsOwn: match.homeTeamGoals,
      goalsBalance: match.awayTeamGoals - match.homeTeamGoals,
    };

    return data;
  };

  private static formatMatches = (
    acc: { totalPoints: number; goalsFavor: number; goalsOwn: number; goalsBalance: number;
      totalVictories: number; totalDraws: number; totalLosses: number; },
    curr:{ matchPoints: number; goalsFavor: number; goalsOwn: number; goalsBalance: number; },
  ) => {
    acc.totalPoints += curr.matchPoints;
    acc.goalsFavor += curr.goalsFavor;
    acc.goalsOwn += curr.goalsOwn;
    acc.goalsBalance += curr.goalsBalance;

    if (curr.matchPoints === 3) acc.totalVictories += 1;
    if (curr.matchPoints === 1) acc.totalDraws += 1;
    if (curr.matchPoints === 0) acc.totalLosses += 1;

    return acc;
  };

  private static calculateEfficiency = (totalPoints: number, totalGames: number) => {
    const calculate = (totalPoints / (totalGames * 3)) * 100;

    const efficiency = parseFloat(calculate.toFixed(2));

    return efficiency;
  };

  private static getLeaderboard = (team: Team) => {
    const initialLeaderboard = { totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };

    const serializedMatches = [...team.homeMatches.map(this.homeMatchesData),
      ...team.awayMatches.map(this.awayMatchesData)];

    const leaderboard = serializedMatches.reduce(this.formatMatches, initialLeaderboard);

    const teamLeaderboard = {
      name: team.teamName,
      totalGames: serializedMatches.length,
      ...leaderboard,
      efficiency: this.calculateEfficiency(leaderboard.totalPoints, serializedMatches.length),
    };

    return teamLeaderboard;
  };

  private static byPriority = (a: Leaderboard, b: Leaderboard) => {
    const firstPriority = b.totalPoints - a.totalPoints;
    const secordPriority = b.totalVictories - a.totalVictories;
    const thirdPriority = b.goalsBalance - a.goalsBalance;
    const fourthPriority = b.goalsFavor - a.goalsFavor;
    const lastPriority = b.goalsOwn - a.goalsOwn;

    if (firstPriority !== 0) {
      return firstPriority;
    }

    if (secordPriority !== 0) {
      return secordPriority;
    }

    if (thirdPriority !== 0) {
      return thirdPriority;
    }

    if (fourthPriority !== 0) {
      return fourthPriority;
    }

    return lastPriority;
  };

  static async list(): Promise<Leaderboard[]> {
    const teams = await TeamModel.findAll({
      include: [
        { model: Matches, as: 'homeMatches', where: { inProgress: false } },
        { model: Matches, as: 'awayMatches', where: { inProgress: false } },
      ],
    });

    const leaderboard = teams.map(this.getLeaderboard)
      .sort(this.byPriority);

    return leaderboard;
  }

  static async findById(id: number): Promise<Leaderboard> {
    const team = await TeamModel.findByPk(id, {
      include: [
        { model: Matches, as: 'homeMatches', where: { inProgress: false } },
        { model: Matches, as: 'awayMatches', where: { inProgress: false } },
      ],
    });

    if (!team) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFoundError';
      throw e;
    }

    const leaderboard = this.getLeaderboard(team);

    return leaderboard as Leaderboard;
  }
}
