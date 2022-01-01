import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { METALS } from '../shared/lib/constants';
import { BaseEntity } from '../shared/lib/entities/base.entity';
import { Level } from '../shared/lib/types/level.enum';

@Entity()
export class Badge extends BaseEntity {
	@PrimaryKey({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	slug!: string;

	@Property({ type: 'text' })
	description!: string;

	@Property()
	value!: number;

	@Property({ type: 'text' })
	type!: string;

	@Property({ type: 'text' })
	class!: string;

	@Property({})
	level!: Level;

	@Property({ type: 'text' })
	iconFilename!: string;

	// https://stackoverflow.com/questions/47893110/typescript-mapped-types-class-to-interface-without-methods
	// For auto typing
	constructor(options: { name: string; slug: string; description: string; value: number; type: string; class: string; level: typeof METALS[number]; iconFilename: string }) {
		super();
		const { level, ...others } = options;
		Object.assign(this, others);
		this.level = METALS.indexOf(level) + 1;
	}
}
