export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          priority: number | null
          start_date: string | null
          target_audience: string[]
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          priority?: number | null
          start_date?: string | null
          target_audience: string[]
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          priority?: number | null
          start_date?: string | null
          target_audience?: string[]
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          arrival_time: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          recorded_by: string | null
          status: string
          student_id: string | null
        }
        Insert: {
          arrival_time?: string | null
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          recorded_by?: string | null
          status: string
          student_id?: string | null
        }
        Update: {
          arrival_time?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          recorded_by?: string | null
          status?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      book_loans: {
        Row: {
          book_id: string | null
          created_at: string | null
          due_date: string
          id: string
          loan_date: string
          loaned_by: string | null
          notes: string | null
          return_date: string | null
          returned_to: string | null
          status: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          loan_date?: string
          loaned_by?: string | null
          notes?: string | null
          return_date?: string | null
          returned_to?: string | null
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          loan_date?: string
          loaned_by?: string | null
          notes?: string | null
          return_date?: string | null
          returned_to?: string | null
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_loans_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "available_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_loans_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_loans_loaned_by_fkey"
            columns: ["loaned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_loans_returned_to_fkey"
            columns: ["returned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_loans_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          available_copies: number
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          isbn: string | null
          location: string | null
          publication_year: number | null
          publisher: string | null
          title: string
          total_copies: number
          updated_at: string | null
        }
        Insert: {
          author: string
          available_copies?: number
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          isbn?: string | null
          location?: string | null
          publication_year?: number | null
          publisher?: string | null
          title: string
          total_copies?: number
          updated_at?: string | null
        }
        Update: {
          author?: string
          available_copies?: number
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          isbn?: string | null
          location?: string | null
          publication_year?: number | null
          publisher?: string | null
          title?: string
          total_copies?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      grades: {
        Row: {
          assignment_name: string
          created_at: string | null
          date: string
          grade: number
          id: string
          max_grade: number
          notes: string | null
          semester: number
          student_id: string | null
          subject: string
          teacher_id: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          assignment_name: string
          created_at?: string | null
          date?: string
          grade: number
          id?: string
          max_grade?: number
          notes?: string | null
          semester: number
          student_id?: string | null
          subject: string
          teacher_id?: string | null
          updated_at?: string | null
          year?: number
        }
        Update: {
          assignment_name?: string
          created_at?: string | null
          date?: string
          grade?: number
          id?: string
          max_grade?: number
          notes?: string | null
          semester?: number
          student_id?: string | null
          subject?: string
          teacher_id?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      kitchen_reports: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          ingredients_used: Json | null
          meals_by_type: Json | null
          observations: string | null
          report_date: string
          total_meals_served: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          ingredients_used?: Json | null
          meals_by_type?: Json | null
          observations?: string | null
          report_date: string
          total_meals_served?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          ingredients_used?: Json | null
          meals_by_type?: Json | null
          observations?: string | null
          report_date?: string
          total_meals_served?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      meal_service: {
        Row: {
          date: string
          id: string
          meal_type: string
          menu_item_id: string | null
          notes: string | null
          quantity: number | null
          satisfaction_rating: number | null
          served_at: string | null
          served_by: string | null
          student_id: string | null
        }
        Insert: {
          date: string
          id?: string
          meal_type: string
          menu_item_id?: string | null
          notes?: string | null
          quantity?: number | null
          satisfaction_rating?: number | null
          served_at?: string | null
          served_by?: string | null
          student_id?: string | null
        }
        Update: {
          date?: string
          id?: string
          meal_type?: string
          menu_item_id?: string | null
          notes?: string | null
          quantity?: number | null
          satisfaction_rating?: number | null
          served_at?: string | null
          served_by?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_service_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "active_menu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_service_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_service_served_by_fkey"
            columns: ["served_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_service_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          allergens: string[] | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          ingredients: string[]
          is_active: boolean | null
          meal_type: string
          name: string
          nutritional_info: Json | null
          preparation_time: number | null
          price: number | null
          servings: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients: string[]
          is_active?: boolean | null
          meal_type: string
          name: string
          nutritional_info?: Json | null
          preparation_time?: number | null
          price?: number | null
          servings?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[]
          is_active?: boolean | null
          meal_type?: string
          name?: string
          nutritional_info?: Json | null
          preparation_time?: number | null
          price?: number | null
          servings?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      menu_orders: {
        Row: {
          created_at: string | null
          id: string
          meal_type: string
          menu_item: string
          order_date: string | null
          status: string | null
          student_id: string
          student_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          meal_type: string
          menu_item: string
          order_date?: string | null
          status?: string | null
          student_id: string
          student_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          meal_type?: string
          menu_item?: string
          order_date?: string | null
          status?: string | null
          student_id?: string
          student_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          class: string | null
          created_at: string | null
          email: string
          enrollment_date: string | null
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          role: string
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          class?: string | null
          created_at?: string | null
          email: string
          enrollment_date?: string | null
          full_name: string
          id: string
          is_active?: boolean | null
          phone?: string | null
          role: string
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          class?: string | null
          created_at?: string | null
          email?: string
          enrollment_date?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: string
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          allergies: string[] | null
          birth_date: string | null
          class: string
          created_at: string | null
          grade_level: number
          id: string
          lunch_preferences: string[] | null
          medical_notes: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          student_number: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          birth_date?: string | null
          class: string
          created_at?: string | null
          grade_level: number
          id?: string
          lunch_preferences?: string[] | null
          medical_notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          student_number: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          birth_date?: string | null
          class?: string
          created_at?: string | null
          grade_level?: number
          id?: string
          lunch_preferences?: string[] | null
          medical_notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          student_number?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          classes: string[]
          created_at: string | null
          department: string | null
          employee_number: string
          hire_date: string
          id: string
          qualification: string | null
          subjects: string[]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          classes: string[]
          created_at?: string | null
          department?: string | null
          employee_number: string
          hire_date: string
          id?: string
          qualification?: string | null
          subjects: string[]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          classes?: string[]
          created_at?: string | null
          department?: string | null
          employee_number?: string
          hire_date?: string
          id?: string
          qualification?: string | null
          subjects?: string[]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_menu: {
        Row: {
          allergens: string[] | null
          category: string | null
          description: string | null
          id: string | null
          ingredients: string[] | null
          meal_type: string | null
          name: string | null
          nutritional_info: Json | null
          preparation_time: number | null
          servings: number | null
          status: string | null
        }
        Insert: {
          allergens?: string[] | null
          category?: string | null
          description?: string | null
          id?: string | null
          ingredients?: string[] | null
          meal_type?: string | null
          name?: string | null
          nutritional_info?: Json | null
          preparation_time?: number | null
          servings?: number | null
          status?: string | null
        }
        Update: {
          allergens?: string[] | null
          category?: string | null
          description?: string | null
          id?: string | null
          ingredients?: string[] | null
          meal_type?: string | null
          name?: string | null
          nutritional_info?: Json | null
          preparation_time?: number | null
          servings?: number | null
          status?: string | null
        }
        Relationships: []
      }
      attendance_stats: {
        Row: {
          absent_count: number | null
          attendance_percentage: number | null
          late_count: number | null
          present_count: number | null
          week: string | null
        }
        Relationships: []
      }
      available_books: {
        Row: {
          author: string | null
          available_copies: number | null
          category: string | null
          description: string | null
          id: string | null
          isbn: string | null
          location: string | null
          publication_year: number | null
          publisher: string | null
          title: string | null
          total_copies: number | null
        }
        Insert: {
          author?: string | null
          available_copies?: number | null
          category?: string | null
          description?: string | null
          id?: string | null
          isbn?: string | null
          location?: string | null
          publication_year?: number | null
          publisher?: string | null
          title?: string | null
          total_copies?: number | null
        }
        Update: {
          author?: string | null
          available_copies?: number | null
          category?: string | null
          description?: string | null
          id?: string | null
          isbn?: string | null
          location?: string | null
          publication_year?: number | null
          publisher?: string | null
          title?: string | null
          total_copies?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student" | "kitchen"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "student", "kitchen"],
    },
  },
} as const
