/**
 * Created by lhb on 15/9/8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var Player = require('./player');

module.exports = {

    _allPlayers : {},
    _removePlayers: {},

    getPlayer : function(playerId) {
        return this._allPlayers[playerId] || this._removePlayers[playerId];
    },

    movePlayerFromRemoveToActive : function(playerId) {
        var remove = this._removePlayers[playerId];
        if (remove) {
            this._allPlayers[playerId] = remove;
            delete this._removePlayers[playerId];
        }
    },

    getActivePlayer : function(playerId) {
        return this._allPlayers[playerId];
    },

    addPlayer : function(player) {
        var player = this._allPlayers[player.id] = new Player(player);
        return player;
    },

    getAllPlayerIds : function() {
        return _.keys(this._allPlayers);
    },

    removePlayer : function(playerId) {
        var player = this.getPlayer(playerId);
        this._removePlayers[playerId] = player;
        delete this._allPlayers[playerId];
        if (!player) {
            log.stats("[removePlayer] failed! playerId", {playerId:playerId});
            return;
        } else {
            log.info("[removePlayer] success! playerId: ", playerId);
        }
        player.logout(function() {
            if (this._removePlayers[playerId]) {
                log.info("delete player success", {playerId:playerId});
            }
            delete this._removePlayers[playerId];
        }.bind(this));
    }
};
