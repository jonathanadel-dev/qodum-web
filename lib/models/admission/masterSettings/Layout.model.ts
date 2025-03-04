import mongoose, { Document, Model } from "mongoose";

export interface ILayout extends Document {
  session: string;
  report_setting: {
    report_name: string;
    report_title: string;
  };
  header_and_footer_setting: {
    is_header_enable?: boolean;
    is_header_line_enable?: boolean;
    is_footer_enable?: boolean;
    is_footer_line_enable?: boolean;
    is_logo_enable?: boolean;
    is_row_no?: boolean;
    is_group?: boolean;
    is_sum?: boolean;
  };
  font_size_setting: {
    font_size: number;
    is_total?: string;
  };
  page_orientation_and_layout_setting: {
    page_orientation?: string;
    page_layout?: string;
  };
  height_and_width_setting: {
    page_width: number;
    page_height: number;
    footer_height: number;
    header_height: number;
    header_line_width: number;
    logo_height: number;
    column_width: number;
    footer_line_height: number;
    table_column_height: number;
  };
  margin_setting: {
    page_margin_right: number;
    page_margin_left: number;
    page_margin_bottom: number;
    page_margin_top: number;
    logo_margin_left: number;
    logo_margin_top: number;
    table_margin_left: number;
    table_margin_top: number;
    footer_line_margin_top: number;
    header_line_margin_top: number;
  };
}

const LayoutSchema = new mongoose.Schema<ILayout>(
  {
    session: { type: String, required: true },
    report_setting: {
      report_name: { type: String, required: true },
      report_title: { type: String, required: true },
    },
    header_and_footer_setting: {
      is_header_enable: { type: Boolean },
      is_header_line_enable: { type: Boolean },
      is_footer_enable: { type: Boolean },
      is_footer_line_enable: { type: Boolean },
      is_logo_enable: { type: Boolean },
      is_row_no: { type: Boolean },
      is_group: { type: Boolean },
      is_sum: { type: Boolean },
    },
    font_size_setting: {
      font_size: { type: Number, required: true },
      is_total: { type: String },
    },
    page_orientation_and_layout_setting: {
      page_orientation: { type: String },
      page_layout: { type: String },
    },
    height_and_width_setting: {
      page_width: { type: Number, required: true },
      page_height: { type: Number, required: true },
      footer_height: { type: Number, required: true },
      header_height: { type: Number, required: true },
      header_line_width: { type: Number, required: true },
      logo_height: { type: Number, required: true },
      column_width: { type: Number, required: true },
      footer_line_height: { type: Number, required: true },
      table_column_height: { type: Number, required: true },
    },
    margin_setting: {
      page_margin_right: { type: Number, required: true },
      page_margin_left: { type: Number, required: true },
      page_margin_bottom: { type: Number, required: true },
      page_margin_top: { type: Number, required: true },
      logo_margin_left: { type: Number, required: true },
      logo_margin_top: { type: Number, required: true },
      table_margin_left: { type: Number, required: true },
      table_margin_top: { type: Number, required: true },
      footer_line_margin_top: { type: Number, required: true },
      header_line_margin_top: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Layout: Model<ILayout> =
  (mongoose.models.Layout as Model<ILayout>) ||
  mongoose.model<ILayout>("Layout", LayoutSchema);

export default Layout;
