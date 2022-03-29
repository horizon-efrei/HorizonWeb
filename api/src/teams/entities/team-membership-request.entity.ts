import {Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/lib/entities/base.entity';
import { User } from '../../users/user.entity';
import { Team } from './team.entity';

@Entity()
export class TeamMembershipRequest extends BaseEntity{
    @PrimaryKey()
    teamMembershipRequestId!: number;

    @ManyToOne({onDelete: 'CASCADE'})
    team!: Team;

    @ManyToOne({onDelete: 'CASCADE'})
    user!: User;

    @Property({type: 'text'})
    reason?: string;

    @Property()
    issuer!: number;

    @Property()
    approved = false;

    @ManyToOne({onDelete: 'CASCADE'})
    approvedBy?: User;

    @ManyToOne({onDelete: 'CASCADE'})
    initiatedBy!: User;

    constructor(options:{
        team: Team;
        user: User;
        reason?: string;
        issuer: number;
        initiatedBy: User;
    }){
        super();
        this.team = options.team;
        this.user = options.user;
        this.reason = options.reason;
        this.issuer = options.issuer;
        this.initiatedBy = options.initiatedBy;
    }

}