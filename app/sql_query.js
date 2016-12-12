/**
 * Created by FuriosA on 30/11/2016.
 */

var teamListQuery = "select * from FootballClub f, TeamInformation t, LineUp l where f.id = l.id and t.lineup = l.id";
var playerOfTeamQuery = "select * from Player p, FootballClub f where p.partOf = f.id and f.id = ";
var allPlayerQuery = "select * from Player";