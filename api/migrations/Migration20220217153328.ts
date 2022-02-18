import { Migration } from '@mikro-orm/migrations';

export class Migration20220217153328 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "club" ("club_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "category" text not null, "description" text not null, "icon" text not null);');

    this.addSql('alter table "user" rename column "username" to "firstname";');


    this.addSql('alter table "user" add column "lastname" text not null, add column "fullname" text not null, add column "fullname_short" text not null, add column "school_role" text check ("school_role" in (\'student\', \'teacher\', \'admin\')) not null, add column "color" text null, add column "signature" text null, add column "banner" text null, add column "description" text null, add column "points" int4 not null;');
    this.addSql('alter table "user" drop constraint if exists "user_password_check";');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "user" alter column "password" drop not null;');

    this.addSql('create table "club_member" ("club_member_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_user_id" varchar(255) not null, "club_club_id" int4 not null, "role" text check ("role" in (\'president\', \'vice-president\', \'secretary\', \'treasurer\', \'manager\', \'member\')) not null, "role_label" varchar(255) null, "join_date" timestamptz(0) not null);');
    this.addSql('create index "club_member_user_user_id_index" on "club_member" ("user_user_id");');
    this.addSql('create index "club_member_club_club_id_index" on "club_member" ("club_club_id");');

    this.addSql('alter table "file_upload" rename column "original_name" to "name";');


    this.addSql('alter table "file_upload" add column "url" text not null;');
    this.addSql('alter table "file_upload" drop constraint if exists "file_upload_file_kind_check";');
    this.addSql('alter table "file_upload" alter column "file_kind" type text using ("file_kind"::text);');
    this.addSql('alter table "file_upload" add constraint "file_upload_file_kind_check" check ("file_kind" in (\'profile-image\', \'info-doc\', \'attachment\', \'study-doc\'));');

    this.addSql('alter table "info_doc" add column "school_year" int2 null;');
    this.addSql('alter table "info_doc" drop column "name";');

    this.addSql('create table "social_account" ("social_account_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "kind" text check ("kind" in (\'club\', \'user\')) not null, "social_social_id" int4 not null, "link" text null, "pseudo" text not null, "club_club_id" int4 null, "user_user_id" varchar(255) null);');
    this.addSql('create index "social_account_kind_index" on "social_account" ("kind");');
    this.addSql('create index "social_account_club_club_id_index" on "social_account" ("club_club_id");');
    this.addSql('create index "social_account_user_user_id_index" on "social_account" ("user_user_id");');

    this.addSql('create table "team_member" ("team_member_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_user_id" varchar(255) not null, "team_team_id" int4 not null, "role" text check ("role" in (\'owner\', \'leader\', \'member\')) not null, "role_label" varchar(255) null, "join_date" timestamptz(0) not null);');
    this.addSql('create index "team_member_user_user_id_index" on "team_member" ("user_user_id");');
    this.addSql('create index "team_member_team_team_id_index" on "team_member" ("team_team_id");');

    this.addSql('create table "content_master" ("content_master_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "post_content_id" int4 null, "kind" text check ("kind" in (\'blog\', \'thread\')) not null, "slug" text null, "category" text null, "location_name" text null, "location" text null, "is_draft" bool null, "title" text null, "type" int2 null, "locked" bool null, "op_validated_with_content_id" int4 null, "admin_validated_with_content_id" int4 null, "admin_validated_by_user_id" varchar(255) null);');
    this.addSql('alter table "content_master" add constraint "content_master_post_content_id_unique" unique ("post_content_id");');
    this.addSql('create index "content_master_kind_index" on "content_master" ("kind");');
    this.addSql('alter table "content_master" add constraint "content_master_op_validated_with_content_id_unique" unique ("op_validated_with_content_id");');
    this.addSql('alter table "content_master" add constraint "content_master_admin_validated_with_content_id_unique" unique ("admin_validated_with_content_id");');

    this.addSql('create table "content" ("content_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "body" text not null, "author_user_id" varchar(255) not null, "upvotes" int4 not null, "downvotes" int4 not null, "kind" int2 not null, "parent_content_id" int4 null, "content_master_type" text check ("content_master_type" in (\'blog\', \'thread\')) not null, "content_master_content_master_id" int4 not null, "hidden" bool not null, "is_visible" bool not null, "report_count" int4 not null, "last_edit_content_edit_id" int4 null);');
    this.addSql('create index "content_kind_index" on "content" ("kind");');
    this.addSql('alter table "content" add constraint "content_last_edit_content_edit_id_unique" unique ("last_edit_content_edit_id");');

    this.addSql('create table "vote" ("vote_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "value" int2 not null, "user_user_id" varchar(255) not null, "content_content_id" int4 not null);');
    this.addSql('create index "vote_user_user_id_index" on "vote" ("user_user_id");');
    this.addSql('create index "vote_content_content_id_index" on "vote" ("content_content_id");');

    this.addSql('create table "content_edit" ("content_edit_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "body" text not null, "edit_order" int4 not null, "parent_content_id" int4 not null, "edited_by_user_id" varchar(255) not null);');

    this.addSql('alter table "attachment" add column "content_content_id" int4 null;');
    this.addSql('alter table "attachment" drop constraint "attachment_post_post_id_foreign";');
    this.addSql('alter table "attachment" drop column "post_post_id";');
    this.addSql('alter table "attachment" drop constraint "attachment_reply_reply_id_foreign";');
    this.addSql('alter table "attachment" drop column "reply_reply_id";');

    this.addSql('create table "content_master_participants" ("content_master_content_master_id" int4 not null, "user_user_id" varchar(255) not null);');
    this.addSql('alter table "content_master_participants" add constraint "content_master_participants_pkey" primary key ("content_master_content_master_id", "user_user_id");');

    this.addSql('create table "content_master_assignees" ("content_master_content_master_id" int4 not null, "user_user_id" varchar(255) not null);');
    this.addSql('alter table "content_master_assignees" add constraint "content_master_assignees_pkey" primary key ("content_master_content_master_id", "user_user_id");');

    this.addSql('alter table "tag" drop constraint if exists "tag_color_check";');
    this.addSql('alter table "tag" alter column "color" type text using ("color"::text);');
    this.addSql('alter table "tag" add constraint "tag_color_check" check ("color" in (\'amber\', \'blue\', \'cyan\', \'emerald\', \'fuchsia\', \'gray\', \'green\', \'indigo\', \'lime\', \'neutral\', \'orange\', \'pink\', \'purple\', \'red\', \'rose\', \'sky\', \'slate\', \'stone\', \'teal\', \'violet\', \'yellow\', \'zinc\'));');

    this.addSql('create table "content_master_tags" ("content_master_content_master_id" int4 not null, "tag_name" text not null);');
    this.addSql('alter table "content_master_tags" add constraint "content_master_tags_pkey" primary key ("content_master_content_master_id", "tag_name");');

    this.addSql('alter table "subject" add column "school_year" int2 not null;');

    this.addSql('alter table "study_doc" add column "cursus" text check ("cursus" in (\'all\', \'classic\', \'int\', \'pex\', \'renforced\')) not null, add column "type" text check ("type" in (\'examDE\', \'examCE\', \'examCC\', \'examDM\', \'examTAI\', \'course\', \'sheet\', \'projects\', \'efreiClass\', \'eprofClass\', \'classNote\', \'other\')) not null, add column "flags" int2 not null;');
    this.addSql('alter table "study_doc" drop constraint if exists "study_doc_year_check";');
    this.addSql('alter table "study_doc" alter column "year" type int4 using ("year"::int4);');
    this.addSql('alter table "study_doc" alter column "year" set not null;');

    this.addSql('create table "statistics" ("user_user_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "post_count" int4 not null, "last_post" timestamptz(0) null, "post_streak" int4 not null, "reply_count" int4 not null, "last_reply" timestamptz(0) null, "reply_streak" int4 not null, "comment_count" int4 not null, "last_comment" timestamptz(0) null, "comment_streak" int4 not null, "upload_count" int4 not null, "last_action" timestamptz(0) null, "action_streak" int4 not null);');
    this.addSql('alter table "statistics" add constraint "statistics_pkey" primary key ("user_user_id");');

    this.addSql('create table "report" ("report_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "reporter_user_id" varchar(255) not null, "user_user_id" varchar(255) not null, "content_content_id" int4 null, "reason" text null);');
    this.addSql('create index "report_reporter_user_id_index" on "report" ("reporter_user_id");');
    this.addSql('create index "report_user_user_id_index" on "report" ("user_user_id");');
    this.addSql('create index "report_content_content_id_index" on "report" ("content_content_id");');
    this.addSql('alter table "report" add constraint "report_content_content_id_unique" unique ("content_content_id");');

    this.addSql('create table "reaction" ("reaction_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_user_id" varchar(255) not null, "content_content_id" int4 not null, "value" text check ("value" in (\'what\', \'interesting\', \'like\', \'laugh\', \'notanissue\', \'bump\', \'unsure\', \'partial\', \'perfect\')) not null);');
    this.addSql('create index "reaction_user_user_id_index" on "reaction" ("user_user_id");');
    this.addSql('create index "reaction_content_content_id_index" on "reaction" ("content_content_id");');
    this.addSql('create index "reaction_value_index" on "reaction" ("value");');

    this.addSql('alter table "favorite" add column "content_content_id" int4 not null;');
    this.addSql('create index "favorite_content_content_id_index" on "favorite" ("content_content_id");');
    this.addSql('alter table "favorite" add constraint "favorite_content_content_id_unique" unique ("content_content_id");');
    this.addSql('drop index "favorite_kind_index";');
    this.addSql('alter table "favorite" drop column "kind";');
    this.addSql('alter table "favorite" drop constraint "favorite_article_article_id_foreign";');
    this.addSql('drop index "favorite_article_article_id_index";');
    this.addSql('alter table "favorite" drop constraint "favorite_article_article_id_unique";');
    this.addSql('alter table "favorite" drop column "article_article_id";');
    this.addSql('alter table "favorite" drop constraint "favorite_comment_comment_id_foreign";');
    this.addSql('drop index "favorite_comment_comment_id_index";');
    this.addSql('alter table "favorite" drop constraint "favorite_comment_comment_id_unique";');
    this.addSql('alter table "favorite" drop column "comment_comment_id";');
    this.addSql('alter table "favorite" drop constraint "favorite_post_post_id_foreign";');
    this.addSql('drop index "favorite_post_post_id_index";');
    this.addSql('alter table "favorite" drop constraint "favorite_post_post_id_unique";');
    this.addSql('alter table "favorite" drop column "post_post_id";');
    this.addSql('alter table "favorite" drop constraint "favorite_reply_reply_id_foreign";');
    this.addSql('drop index "favorite_reply_reply_id_index";');
    this.addSql('alter table "favorite" drop constraint "favorite_reply_reply_id_unique";');
    this.addSql('alter table "favorite" drop column "reply_reply_id";');

    this.addSql('create table "badge" ("badge_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "description" text not null, "point_prize" int4 not null, "level" int2 not null, "icon" text not null, "serie" text not null, "statistic" text check ("statistic" in (\'comment\', \'post\', \'reply\', \'upload\')) not null, "statistic_threshold" int4 not null);');

    this.addSql('create table "badge_unlock" ("badge_unlock_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_user_id" varchar(255) not null, "badge_badge_id" int4 not null, "unlock_date" timestamptz(0) not null);');
    this.addSql('create index "badge_unlock_user_user_id_index" on "badge_unlock" ("user_user_id");');

    this.addSql('alter table "club_member" add constraint "club_member_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "club_member" add constraint "club_member_club_club_id_foreign" foreign key ("club_club_id") references "club" ("club_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "social_account" add constraint "social_account_social_social_id_foreign" foreign key ("social_social_id") references "social" ("social_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "social_account" add constraint "social_account_club_club_id_foreign" foreign key ("club_club_id") references "club" ("club_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "social_account" add constraint "social_account_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "team_member" add constraint "team_member_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "team_member" add constraint "team_member_team_team_id_foreign" foreign key ("team_team_id") references "team" ("team_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "content_master" add constraint "content_master_post_content_id_foreign" foreign key ("post_content_id") references "content" ("content_id") on update cascade on delete set null;');
    this.addSql('alter table "content_master" add constraint "content_master_op_validated_with_content_id_foreign" foreign key ("op_validated_with_content_id") references "content" ("content_id") on update cascade on delete set null;');
    this.addSql('alter table "content_master" add constraint "content_master_admin_validated_with_content_id_foreign" foreign key ("admin_validated_with_content_id") references "content" ("content_id") on update cascade on delete set null;');
    this.addSql('alter table "content_master" add constraint "content_master_admin_validated_by_user_id_foreign" foreign key ("admin_validated_by_user_id") references "user" ("user_id") on update cascade on delete set null;');

    this.addSql('alter table "content" add constraint "content_author_user_id_foreign" foreign key ("author_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "content" add constraint "content_parent_content_id_foreign" foreign key ("parent_content_id") references "content" ("content_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "content" add constraint "content_content_master_content_master_id_foreign" foreign key ("content_master_content_master_id") references "content_master" ("content_master_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "content" add constraint "content_last_edit_content_edit_id_foreign" foreign key ("last_edit_content_edit_id") references "content_edit" ("content_edit_id") on update cascade on delete set null;');

    this.addSql('alter table "vote" add constraint "vote_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "vote" add constraint "vote_content_content_id_foreign" foreign key ("content_content_id") references "content" ("content_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "content_edit" add constraint "content_edit_parent_content_id_foreign" foreign key ("parent_content_id") references "content" ("content_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "content_edit" add constraint "content_edit_edited_by_user_id_foreign" foreign key ("edited_by_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "attachment" add constraint "attachment_content_content_id_foreign" foreign key ("content_content_id") references "content" ("content_id") on update cascade on delete set null;');

    this.addSql('alter table "content_master_participants" add constraint "content_master_participants_content_master_content_master_id_foreign" foreign key ("content_master_content_master_id") references "content_master" ("content_master_id") on update cascade on delete cascade;');
    this.addSql('alter table "content_master_participants" add constraint "content_master_participants_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete cascade;');

    this.addSql('alter table "content_master_assignees" add constraint "content_master_assignees_content_master_content_master_id_foreign" foreign key ("content_master_content_master_id") references "content_master" ("content_master_id") on update cascade on delete cascade;');
    this.addSql('alter table "content_master_assignees" add constraint "content_master_assignees_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete cascade;');

    this.addSql('alter table "content_master_tags" add constraint "content_master_tags_content_master_content_master_id_foreign" foreign key ("content_master_content_master_id") references "content_master" ("content_master_id") on update cascade on delete cascade;');
    this.addSql('alter table "content_master_tags" add constraint "content_master_tags_tag_name_foreign" foreign key ("tag_name") references "tag" ("name") on update cascade on delete cascade;');

    this.addSql('alter table "statistics" add constraint "statistics_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete cascade;');

    this.addSql('alter table "report" add constraint "report_reporter_user_id_foreign" foreign key ("reporter_user_id") references "user" ("user_id") on update cascade;');
    this.addSql('alter table "report" add constraint "report_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "report" add constraint "report_content_content_id_foreign" foreign key ("content_content_id") references "content" ("content_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "reaction" add constraint "reaction_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "reaction" add constraint "reaction_content_content_id_foreign" foreign key ("content_content_id") references "content" ("content_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "favorite" add constraint "favorite_content_content_id_foreign" foreign key ("content_content_id") references "content" ("content_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "badge_unlock" add constraint "badge_unlock_user_user_id_foreign" foreign key ("user_user_id") references "user" ("user_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "badge_unlock" add constraint "badge_unlock_badge_badge_id_foreign" foreign key ("badge_badge_id") references "badge" ("badge_id") on update cascade on delete CASCADE;');

    this.addSql('drop index "user_username_index";');

    this.addSql('alter table "user" drop constraint "user_username_unique";');

    this.addSql('alter table "user" drop constraint "user_email_unique";');

    this.addSql('alter table "profile_image" drop constraint "profile_image_user_user_id_unique";');

    this.addSql('drop table if exists "article" cascade;');

    this.addSql('drop table if exists "article_reaction" cascade;');

    this.addSql('drop table if exists "article_tags" cascade;');

    this.addSql('drop table if exists "article_vote" cascade;');

    this.addSql('drop table if exists "comment" cascade;');

    this.addSql('drop table if exists "comment_vote" cascade;');

    this.addSql('drop table if exists "info_doc_tags" cascade;');

    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "post_reaction" cascade;');

    this.addSql('drop table if exists "post_tags" cascade;');

    this.addSql('drop table if exists "post_vote" cascade;');

    this.addSql('drop table if exists "reply" cascade;');

    this.addSql('drop table if exists "reply_reaction" cascade;');

    this.addSql('drop table if exists "reply_vote" cascade;');

    this.addSql('drop table if exists "study_doc_tags" cascade;');
  }

}
