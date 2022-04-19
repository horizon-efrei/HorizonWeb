import {
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/lib/entities/base.entity';
import { User } from '../../users/user.entity';
import { MembershipRequestIssuer } from '../membership-request-issuer.enum';
import { Team } from './team.entity';

@Entity()
export class TeamMembershipRequest extends BaseEntity {
  @PrimaryKey()
  teamMembershipRequestId!: number;

  @ManyToOne({ onDelete: 'CASCADE' })
  @Index()
  team!: Team;

  @ManyToOne({ onDelete: 'CASCADE' })
  @Index()
  user!: User;

  @Property({ type: 'text' })
  reason?: string;

  @Enum(() => MembershipRequestIssuer)
  issuer!: MembershipRequestIssuer;

  @Property()
  approved = false;

  @ManyToOne({ onDelete: 'CASCADE' })
  approvedBy?: User;

  @ManyToOne({ onDelete: 'CASCADE' })
  initiatedBy!: User;

  constructor(options: {
    team: Team;
    user: User;
    reason?: string;
    issuer: MembershipRequestIssuer;
    initiatedBy: User;
  }) {
    super();
    this.team = options.team;
    this.user = options.user;
    this.reason = options.reason;
    this.issuer = options.issuer;
    this.initiatedBy = options.initiatedBy;
  }
}
