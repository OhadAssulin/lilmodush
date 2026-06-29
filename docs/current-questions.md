# Current Questions Inventory

Generated from the current codebase and the imported Excel question bank. Includes the question banks that currently have `difficultyScore`: the Admin/Child problem-set bank and the Math Practice bank.

## Summary

| Bank | Count | Notes |
| --- | ---: | --- |
| Admin / Child built-in seed | 20 | Existing manually curated starter questions in `src/lib/questions.ts`. |
| Imported Excel question bank | 472 | Generated into `src/lib/imported-question-bank.ts` from `מאגר_שאלות_חדש_כיתות_א_ג.xlsx`. |
| Math Practice bank | 40 | Separate math practice dialog bank in `src/lib/math-questions.ts`. |
| Total documented questions | 532 | Adaptive assessment items are separate because they use adaptive `level`, not only `difficultyScore`. |

## Imported Excel Bank Coverage

### By Domain

| Domain | Count |
| --- | ---: |
| חשבון | 220 |
| עברית | 126 |
| ידע כללי | 78 |
| מדעים | 48 |

### By Grade

| Grade | Count |
| --- | ---: |
| כיתה ב׳ | 261 |
| כיתה ג׳ | 121 |
| כיתה א׳ | 90 |

### By Question Type

| Type | Count |
| --- | ---: |
| American / multiple choice | 291 |
| Open input | 146 |
| Oral reading | 18 |
| Writing prompt | 12 |
| Ordering | 5 |

### By Skill

| Skill key | Count |
| --- | ---: |
| `add_sub_to_1000` | 8 |
| `add_sub_to_10000` | 6 |
| `addition_to_10` | 8 |
| `addition_to_100_no_regrouping` | 8 |
| `addition_to_100_with_regrouping` | 8 |
| `addition_to_20` | 8 |
| `animals` | 6 |
| `antonyms` | 6 |
| `basic_geography` | 6 |
| `basic_verb_tense` | 6 |
| `compare_numbers` | 8 |
| `compare_simple_fractions` | 6 |
| `conditions_logic` | 6 |
| `connectives` | 6 |
| `count_quantity` | 8 |
| `division_by_multiplication_table` | 8 |
| `division_grouping` | 6 |
| `early_algebraic_thinking` | 6 |
| `environment` | 6 |
| `figural_analogies` | 6 |
| `figural_matrices` | 6 |
| `full_multiplication_table` | 8 |
| `gender_masculine_feminine` | 6 |
| `generalization_rules` | 6 |
| `holidays` | 6 |
| `human_body` | 6 |
| `information_text_structure` | 6 |
| `israel_symbols` | 6 |
| `letter_recognition` | 6 |
| `materials_properties` | 6 |
| `measurements` | 6 |
| `money_change` | 6 |
| `multi_step_instructions` | 6 |
| `multiple_solution_paths` | 6 |
| `multiplication_as_repeated_addition` | 6 |
| `multiplication_table_to_5` | 8 |
| `non_routine_problems` | 6 |
| `number_order` | 8 |
| `numeric_patterns_sequences` | 6 |
| `odd_one_out` | 6 |
| `one_step_word_problem` | 6 |
| `opening_closing_sound` | 6 |
| `paragraph_writing` | 6 |
| `place_value_to_100` | 8 |
| `place_value_to_1000` | 8 |
| `place_value_to_10000` | 6 |
| `plants` | 6 |
| `punctuation` | 6 |
| `reading_explicit_detail` | 6 |
| `reading_fluency` | 6 |
| `reading_simple_inference` | 6 |
| `reading_text_evidence` | 6 |
| `sentence_reading` | 6 |
| `sentence_writing` | 6 |
| `simple_fractions_half_third_quarter` | 6 |
| `simple_order_of_operations` | 6 |
| `singular_plural` | 6 |
| `space` | 6 |
| `spatial_reasoning` | 6 |
| `story_text_structure` | 6 |
| `subtraction_to_10` | 8 |
| `subtraction_to_100_no_borrowing` | 8 |
| `subtraction_to_100_with_borrowing` | 8 |
| `subtraction_to_20` | 8 |
| `synonyms` | 6 |
| `time_clock` | 6 |
| `time_concepts` | 6 |
| `two_step_word_problem` | 6 |
| `verbal_analogies` | 6 |
| `vocabulary_context` | 6 |
| `water_states` | 6 |
| `weather` | 6 |
| `word_reading` | 6 |

## Imported Excel Questions

Source: `src/lib/imported-question-bank.ts`

| ID | Domain | Grade | Skill key | Type | Difficulty | Question | Answer |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| new-math-count_quantity-001 | חשבון | כיתה א׳ | `count_quantity` | Open input | 1 | כמה עיגולים יש? ●●● | 3 |
| new-math-count_quantity-002 | חשבון | כיתה א׳ | `count_quantity` | Open input | 1 | כמה כוכבים יש? ★★★★ | 4 |
| new-math-count_quantity-003 | חשבון | כיתה א׳ | `count_quantity` | Open input | 2 | כמה תפוחים יש? 🍎🍎🍎🍎🍎🍎 | 6 |
| new-math-count_quantity-004 | חשבון | כיתה א׳ | `count_quantity` | Open input | 2 | ספרו את הקוביות: ■■■■■■■■ | 8 |
| new-math-count_quantity-005 | חשבון | כיתה ב׳ | `count_quantity` | Open input | 3 | כמה פרחים יש? 🌼🌼🌼🌼🌼🌼🌼🌼🌼 | 9 |
| new-math-count_quantity-006 | חשבון | כיתה ב׳ | `count_quantity` | Open input | 3 | בצלחת יש 10 ענבים ועוד ענב אחד. כמה ענבים יש? | 11 |
| new-math-count_quantity-007 | חשבון | כיתה ב׳ | `count_quantity` | Open input | 4 | כמה נקודות יש אם ספרנו 5 ועוד 5 ועוד 2? | 12 |
| new-math-count_quantity-008 | חשבון | כיתה ב׳ | `count_quantity` | Open input | 4 | איזה מספר מתאים לכמות: עשר עפרונות ושלושה עפרונות? | 13 |
| new-math-compare_numbers-001 | חשבון | כיתה א׳ | `compare_numbers` | American / multiple choice | 1 | מה גדול יותר: 6 או 9? | 9 |
| new-math-compare_numbers-002 | חשבון | כיתה א׳ | `compare_numbers` | American / multiple choice | 2 | מה קטן יותר: 14 או 17? | 14 |
| new-math-compare_numbers-003 | חשבון | כיתה ב׳ | `compare_numbers` | American / multiple choice | 3 | בחרו את הסימן הנכון: 23 __ 32 | < |
| new-math-compare_numbers-004 | חשבון | כיתה ב׳ | `compare_numbers` | American / multiple choice | 3 | איזה מספר גדול יותר: 58 או 85? | 85 |
| new-math-compare_numbers-005 | חשבון | כיתה ב׳ | `compare_numbers` | American / multiple choice | 4 | בחרו את המספר הקטן ביותר: 402, 420, 240, 204 | 204 |
| new-math-compare_numbers-008 | חשבון | כיתה ב׳ | `compare_numbers` | American / multiple choice | 4 | איזה מספר נמצא בין 690 ל־710? | 705 |
| new-math-compare_numbers-006 | חשבון | כיתה ג׳ | `compare_numbers` | American / multiple choice | 5 | איזה מספר גדול יותר: 1,099 או 1,101? | 1,101 |
| new-math-compare_numbers-007 | חשבון | כיתה ג׳ | `compare_numbers` | American / multiple choice | 5 | בחרו את הסימן הנכון: 3,450 __ 3,405 | > |
| new-math-number_order-001 | חשבון | כיתה א׳ | `number_order` | American / multiple choice | 1 | איזה מספר בא אחרי 7? | 8 |
| new-math-number_order-002 | חשבון | כיתה א׳ | `number_order` | American / multiple choice | 2 | איזה מספר בא לפני 16? | 15 |
| new-math-number_order-003 | חשבון | כיתה א׳ | `number_order` | Ordering | 2 | סדרו מהקטן לגדול: 12, 9, 15 | 9, 12, 15 |
| new-math-number_order-004 | חשבון | כיתה ב׳ | `number_order` | American / multiple choice | 3 | איזה מספר חסר? 18, 19, __, 21 | 20 |
| new-math-number_order-005 | חשבון | כיתה ב׳ | `number_order` | Ordering | 3 | סדרו מהקטן לגדול: 84, 48, 80, 40 | 40, 48, 80, 84 |
| new-math-number_order-006 | חשבון | כיתה ב׳ | `number_order` | American / multiple choice | 4 | איזה מספר בא 10 אחרי 56? | 66 |
| new-math-number_order-007 | חשבון | כיתה ג׳ | `number_order` | Ordering | 5 | סדרו מהגדול לקטן: 305, 350, 503, 530 | 530, 503, 350, 305 |
| new-math-number_order-008 | חשבון | כיתה ג׳ | `number_order` | American / multiple choice | 5 | איזה מספר חסר? 1,200, 1,300, __, 1,500 | 1,400 |
| new-math-addition_to_10-001 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 1 | כמה זה 1 + 4? | 5 |
| new-math-addition_to_10-002 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 1 | כמה זה 2 + 3? | 5 |
| new-math-addition_to_10-007 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 1 | כמה זה 4 + 4? | 8 |
| new-math-addition_to_10-008 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 1 | כמה זה 9 + 0? | 9 |
| new-math-addition_to_10-003 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 2 | כמה זה 6 + 2? | 8 |
| new-math-addition_to_10-004 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 2 | כמה זה 5 + 4? | 9 |
| new-math-addition_to_10-005 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 2 | כמה זה 7 + 3? | 10 |
| new-math-addition_to_10-006 | חשבון | כיתה א׳ | `addition_to_10` | Open input | 2 | כמה זה 8 + 1? | 9 |
| new-math-subtraction_to_10-001 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 1 | כמה זה 5 - 2? | 3 |
| new-math-subtraction_to_10-002 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 1 | כמה זה 6 - 1? | 5 |
| new-math-subtraction_to_10-006 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 1 | כמה זה 7 - 0? | 7 |
| new-math-subtraction_to_10-008 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 1 | כמה זה 4 - 4? | 0 |
| new-math-subtraction_to_10-003 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 2 | כמה זה 8 - 3? | 5 |
| new-math-subtraction_to_10-004 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 2 | כמה זה 10 - 4? | 6 |
| new-math-subtraction_to_10-005 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 2 | כמה זה 9 - 7? | 2 |
| new-math-subtraction_to_10-007 | חשבון | כיתה א׳ | `subtraction_to_10` | Open input | 2 | כמה זה 10 - 9? | 1 |
| new-math-addition_to_20-001 | חשבון | כיתה א׳ | `addition_to_20` | Open input | 2 | כמה זה 9 + 2? | 11 |
| new-math-addition_to_20-003 | חשבון | כיתה א׳ | `addition_to_20` | Open input | 2 | כמה זה 11 + 5? | 16 |
| new-math-addition_to_20-008 | חשבון | כיתה א׳ | `addition_to_20` | Open input | 2 | כמה זה 10 + 9? | 19 |
| new-math-addition_to_20-002 | חשבון | כיתה ב׳ | `addition_to_20` | Open input | 3 | כמה זה 7 + 8? | 15 |
| new-math-addition_to_20-004 | חשבון | כיתה ב׳ | `addition_to_20` | Open input | 3 | כמה זה 6 + 9? | 15 |
| new-math-addition_to_20-005 | חשבון | כיתה ב׳ | `addition_to_20` | Open input | 3 | כמה זה 13 + 4? | 17 |
| new-math-addition_to_20-006 | חשבון | כיתה ב׳ | `addition_to_20` | Open input | 3 | כמה זה 8 + 8? | 16 |
| new-math-addition_to_20-007 | חשבון | כיתה ב׳ | `addition_to_20` | Open input | 4 | כמה זה 12 + 7? | 19 |
| new-math-subtraction_to_20-001 | חשבון | כיתה א׳ | `subtraction_to_20` | Open input | 2 | כמה זה 12 - 3? | 9 |
| new-math-subtraction_to_20-008 | חשבון | כיתה א׳ | `subtraction_to_20` | Open input | 2 | כמה זה 13 - 4? | 9 |
| new-math-subtraction_to_20-002 | חשבון | כיתה ב׳ | `subtraction_to_20` | Open input | 3 | כמה זה 15 - 6? | 9 |
| new-math-subtraction_to_20-003 | חשבון | כיתה ב׳ | `subtraction_to_20` | Open input | 3 | כמה זה 18 - 9? | 9 |
| new-math-subtraction_to_20-004 | חשבון | כיתה ב׳ | `subtraction_to_20` | Open input | 3 | כמה זה 20 - 7? | 13 |
| new-math-subtraction_to_20-007 | חשבון | כיתה ב׳ | `subtraction_to_20` | Open input | 3 | כמה זה 19 - 5? | 14 |
| new-math-subtraction_to_20-005 | חשבון | כיתה ב׳ | `subtraction_to_20` | Open input | 4 | כמה זה 14 - 8? | 6 |
| new-math-subtraction_to_20-006 | חשבון | כיתה ב׳ | `subtraction_to_20` | Open input | 4 | כמה זה 16 - 7? | 9 |
| new-math-addition_to_100_no_regrouping-001 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 3 | כמה זה 23 + 14? | 37 |
| new-math-addition_to_100_no_regrouping-002 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 3 | כמה זה 31 + 25? | 56 |
| new-math-addition_to_100_no_regrouping-003 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 3 | כמה זה 42 + 16? | 58 |
| new-math-addition_to_100_no_regrouping-004 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 3 | כמה זה 50 + 27? | 77 |
| new-math-addition_to_100_no_regrouping-007 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 3 | כמה זה 36 + 22? | 58 |
| new-math-addition_to_100_no_regrouping-005 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 4 | כמה זה 64 + 15? | 79 |
| new-math-addition_to_100_no_regrouping-006 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 4 | כמה זה 72 + 17? | 89 |
| new-math-addition_to_100_no_regrouping-008 | חשבון | כיתה ב׳ | `addition_to_100_no_regrouping` | Open input | 4 | כמה זה 81 + 18? | 99 |
| new-math-addition_to_100_with_regrouping-001 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 4 | כמה זה 28 + 17? | 45 |
| new-math-addition_to_100_with_regrouping-002 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 4 | כמה זה 36 + 29? | 65 |
| new-math-addition_to_100_with_regrouping-003 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 4 | כמה זה 45 + 38? | 83 |
| new-math-addition_to_100_with_regrouping-008 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 4 | כמה זה 46 + 27? | 73 |
| new-math-addition_to_100_with_regrouping-004 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 5 | כמה זה 57 + 26? | 83 |
| new-math-addition_to_100_with_regrouping-005 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 5 | כמה זה 68 + 24? | 92 |
| new-math-addition_to_100_with_regrouping-006 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 5 | כמה זה 39 + 48? | 87 |
| new-math-addition_to_100_with_regrouping-007 | חשבון | כיתה ב׳ | `addition_to_100_with_regrouping` | Open input | 5 | כמה זה 75 + 19? | 94 |
| new-math-subtraction_to_100_no_borrowing-001 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 3 | כמה זה 47 - 12? | 35 |
| new-math-subtraction_to_100_no_borrowing-002 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 3 | כמה זה 68 - 25? | 43 |
| new-math-subtraction_to_100_no_borrowing-003 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 3 | כמה זה 59 - 36? | 23 |
| new-math-subtraction_to_100_no_borrowing-004 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 3 | כמה זה 80 - 40? | 40 |
| new-math-subtraction_to_100_no_borrowing-008 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 3 | כמה זה 64 - 31? | 33 |
| new-math-subtraction_to_100_no_borrowing-005 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 4 | כמה זה 76 - 14? | 62 |
| new-math-subtraction_to_100_no_borrowing-006 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 4 | כמה זה 95 - 53? | 42 |
| new-math-subtraction_to_100_no_borrowing-007 | חשבון | כיתה ב׳ | `subtraction_to_100_no_borrowing` | Open input | 4 | כמה זה 88 - 22? | 66 |
| new-math-subtraction_to_100_with_borrowing-001 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 4 | כמה זה 42 - 18? | 24 |
| new-math-subtraction_to_100_with_borrowing-002 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 4 | כמה זה 53 - 27? | 26 |
| new-math-subtraction_to_100_with_borrowing-003 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 4 | כמה זה 70 - 46? | 24 |
| new-math-subtraction_to_100_with_borrowing-007 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 4 | כמה זה 50 - 16? | 34 |
| new-math-subtraction_to_100_with_borrowing-004 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 5 | כמה זה 91 - 38? | 53 |
| new-math-subtraction_to_100_with_borrowing-005 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 5 | כמה זה 64 - 29? | 35 |
| new-math-subtraction_to_100_with_borrowing-006 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 5 | כמה זה 82 - 57? | 25 |
| new-math-subtraction_to_100_with_borrowing-008 | חשבון | כיתה ב׳ | `subtraction_to_100_with_borrowing` | Open input | 5 | כמה זה 73 - 45? | 28 |
| new-math-place_value_to_100-001 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 3 | במספר 46, כמה עשרות יש? | 4 |
| new-math-place_value_to_100-002 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 3 | במספר 73, כמה יחידות יש? | 3 |
| new-math-place_value_to_100-003 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 3 | איזה מספר שווה ל־5 עשרות ו־2 יחידות? | 52 |
| new-math-place_value_to_100-004 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 3 | איזה פירוק מתאים ל־68? | 60 + 8 |
| new-math-place_value_to_100-005 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 4 | מה הערך של הספרה 9 במספר 94? | 90 |
| new-math-place_value_to_100-006 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 4 | איזה מספר גדול ב־10 מ־37? | 47 |
| new-math-place_value_to_100-007 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 4 | איזה מספר קטן ב־10 מ־80? | 70 |
| new-math-place_value_to_100-008 | חשבון | כיתה ב׳ | `place_value_to_100` | American / multiple choice | 4 | כמה עשרות ויחידות יש במספר 99? | 9 עשרות ו־9 יחידות |
| new-math-place_value_to_1000-001 | חשבון | כיתה ב׳ | `place_value_to_1000` | American / multiple choice | 4 | במספר 384, מה הערך של הספרה 3? | 300 |
| new-math-place_value_to_1000-002 | חשבון | כיתה ב׳ | `place_value_to_1000` | American / multiple choice | 4 | איזה מספר שווה ל־6 מאות, 2 עשרות ו־5 יחידות? | 625 |
| new-math-place_value_to_1000-003 | חשבון | כיתה ב׳ | `place_value_to_1000` | American / multiple choice | 4 | איזה פירוק מתאים ל־742? | 700 + 40 + 2 |
| new-math-place_value_to_1000-004 | חשבון | כיתה ב׳ | `place_value_to_1000` | American / multiple choice | 4 | כמה עשרות יש במספר 580? | 8 |
| new-math-place_value_to_1000-005 | חשבון | כיתה ג׳ | `place_value_to_1000` | American / multiple choice | 5 | איזה מספר גדול ב־100 מ־235? | 335 |
| new-math-place_value_to_1000-006 | חשבון | כיתה ג׳ | `place_value_to_1000` | American / multiple choice | 5 | איזה מספר קטן ב־100 מ־904? | 804 |
| new-math-place_value_to_1000-007 | חשבון | כיתה ג׳ | `place_value_to_1000` | Ordering | 5 | סדרו מהקטן לגדול: 209, 290, 902, 920 | 209, 290, 902, 920 |
| new-math-place_value_to_1000-008 | חשבון | כיתה ג׳ | `place_value_to_1000` | American / multiple choice | 5 | מה הערך של הספרה 7 במספר 1,075? | 70 |
| new-math-place_value_to_10000-001 | חשבון | כיתה ג׳ | `place_value_to_10000` | American / multiple choice | 5 | במספר 4,382, מה הערך של הספרה 4? | 4,000 |
| new-math-place_value_to_10000-002 | חשבון | כיתה ג׳ | `place_value_to_10000` | American / multiple choice | 5 | איזה מספר שווה ל־3 אלפים, 7 מאות, 0 עשרות ו־5 יחידות? | 3,705 |
| new-math-place_value_to_10000-003 | חשבון | כיתה ג׳ | `place_value_to_10000` | American / multiple choice | 5 | איזה פירוק מתאים ל־6,241? | 6,000 + 200 + 40 + 1 |
| new-math-place_value_to_10000-004 | חשבון | כיתה ג׳ | `place_value_to_10000` | American / multiple choice | 5 | מה הערך של הספרה 8 במספר 8,093? | 8,000 |
| new-math-place_value_to_10000-005 | חשבון | כיתה ג׳ | `place_value_to_10000` | Ordering | 5 | סדרו מהקטן לגדול: 2,904, 2,490, 2,940, 2,409 | 2,409, 2,490, 2,904, 2,940 |
| new-math-place_value_to_10000-006 | חשבון | כיתה ג׳ | `place_value_to_10000` | American / multiple choice | 5 | איזה מספר גדול ב־1,000 מ־7,256? | 8,256 |
| new-math-add_sub_to_1000-001 | חשבון | כיתה ב׳ | `add_sub_to_1000` | Open input | 4 | כמה זה 245 + 132? | 377 |
| new-math-add_sub_to_1000-002 | חשבון | כיתה ב׳ | `add_sub_to_1000` | Open input | 4 | כמה זה 680 - 240? | 440 |
| new-math-add_sub_to_1000-007 | חשבון | כיתה ב׳ | `add_sub_to_1000` | Open input | 4 | כמה זה 124 + 276? | 400 |
| new-math-add_sub_to_1000-003 | חשבון | כיתה ג׳ | `add_sub_to_1000` | Open input | 5 | כמה זה 356 + 218? | 574 |
| new-math-add_sub_to_1000-004 | חשבון | כיתה ג׳ | `add_sub_to_1000` | Open input | 5 | כמה זה 903 - 457? | 446 |
| new-math-add_sub_to_1000-005 | חשבון | כיתה ג׳ | `add_sub_to_1000` | Open input | 5 | כמה זה 499 + 301? | 800 |
| new-math-add_sub_to_1000-006 | חשבון | כיתה ג׳ | `add_sub_to_1000` | Open input | 5 | כמה זה 750 - 168? | 582 |
| new-math-add_sub_to_1000-008 | חשבון | כיתה ג׳ | `add_sub_to_1000` | Open input | 5 | כמה זה 602 - 205? | 397 |
| new-math-add_sub_to_10000-001 | חשבון | כיתה ג׳ | `add_sub_to_10000` | Open input | 5 | כמה זה 1,245 + 378? | 1623 |
| new-math-add_sub_to_10000-002 | חשבון | כיתה ג׳ | `add_sub_to_10000` | Open input | 5 | כמה זה 3,200 - 1,450? | 1750 |
| new-math-add_sub_to_10000-003 | חשבון | כיתה ג׳ | `add_sub_to_10000` | Open input | 5 | כמה זה 4,075 + 2,630? | 6705 |
| new-math-add_sub_to_10000-004 | חשבון | כיתה ג׳ | `add_sub_to_10000` | Open input | 5 | כמה זה 8,000 - 3,475? | 4525 |
| new-math-add_sub_to_10000-005 | חשבון | כיתה ג׳ | `add_sub_to_10000` | Open input | 5 | כמה זה 2,999 + 1,001? | 4000 |
| new-math-add_sub_to_10000-006 | חשבון | כיתה ג׳ | `add_sub_to_10000` | Open input | 5 | כמה זה 7,350 - 2,125? | 5225 |
| new-math-multiplication_as_repeated_addition-001 | חשבון | כיתה ב׳ | `multiplication_as_repeated_addition` | American / multiple choice | 3 | מה שווה 3 קבוצות של 2? | 6 |
| new-math-multiplication_as_repeated_addition-002 | חשבון | כיתה ב׳ | `multiplication_as_repeated_addition` | American / multiple choice | 3 | איזה תרגיל חיבור מתאים ל־4 × 3? | 3 + 3 + 3 + 3 |
| new-math-multiplication_as_repeated_addition-003 | חשבון | כיתה ב׳ | `multiplication_as_repeated_addition` | American / multiple choice | 3 | יש 5 צלחות ובכל צלחת 2 עוגיות. כמה עוגיות יש? | 10 |
| new-math-multiplication_as_repeated_addition-004 | חשבון | כיתה ב׳ | `multiplication_as_repeated_addition` | American / multiple choice | 4 | מה שווה 6 קבוצות של 3? | 18 |
| new-math-multiplication_as_repeated_addition-005 | חשבון | כיתה ב׳ | `multiplication_as_repeated_addition` | American / multiple choice | 4 | איזה תרגיל כפל מתאים ל־7 + 7 + 7 + 7? | 4 × 7 |
| new-math-multiplication_as_repeated_addition-006 | חשבון | כיתה ג׳ | `multiplication_as_repeated_addition` | American / multiple choice | 5 | יש 8 שקיות ובכל שקית 4 גולות. כמה גולות יש? | 32 |
| new-math-multiplication_table_to_5-001 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 3 | כמה זה 2 × 4? | 8 |
| new-math-multiplication_table_to_5-002 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 3 | כמה זה 3 × 5? | 15 |
| new-math-multiplication_table_to_5-005 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 3 | כמה זה 5 × 2? | 10 |
| new-math-multiplication_table_to_5-008 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 3 | כמה זה 2 × 5? | 10 |
| new-math-multiplication_table_to_5-003 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 4 | כמה זה 4 × 4? | 16 |
| new-math-multiplication_table_to_5-004 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 4 | כמה זה 5 × 5? | 25 |
| new-math-multiplication_table_to_5-006 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 4 | כמה זה 4 × 3? | 12 |
| new-math-multiplication_table_to_5-007 | חשבון | כיתה ב׳ | `multiplication_table_to_5` | Open input | 4 | כמה זה 5 × 4? | 20 |
| new-math-full_multiplication_table-005 | חשבון | כיתה ב׳ | `full_multiplication_table` | Open input | 4 | כמה זה 8 × 5? | 40 |
| new-math-full_multiplication_table-007 | חשבון | כיתה ב׳ | `full_multiplication_table` | Open input | 4 | כמה זה 6 × 6? | 36 |
| new-math-full_multiplication_table-001 | חשבון | כיתה ג׳ | `full_multiplication_table` | Open input | 5 | כמה זה 6 × 7? | 42 |
| new-math-full_multiplication_table-002 | חשבון | כיתה ג׳ | `full_multiplication_table` | Open input | 5 | כמה זה 8 × 8? | 64 |
| new-math-full_multiplication_table-003 | חשבון | כיתה ג׳ | `full_multiplication_table` | Open input | 5 | כמה זה 9 × 6? | 54 |
| new-math-full_multiplication_table-004 | חשבון | כיתה ג׳ | `full_multiplication_table` | Open input | 5 | כמה זה 7 × 9? | 63 |
| new-math-full_multiplication_table-006 | חשבון | כיתה ג׳ | `full_multiplication_table` | Open input | 5 | כמה זה 9 × 9? | 81 |
| new-math-full_multiplication_table-008 | חשבון | כיתה ג׳ | `full_multiplication_table` | Open input | 5 | כמה זה 7 × 8? | 56 |
| new-math-division_grouping-001 | חשבון | כיתה ב׳ | `division_grouping` | American / multiple choice | 3 | יש 12 קוביות ומחלקים אותן ל־3 קבוצות שוות. כמה קוביות בכל קבוצה? | 4 |
| new-math-division_grouping-002 | חשבון | כיתה ב׳ | `division_grouping` | American / multiple choice | 3 | יש 15 מדבקות ומחלקים ל־5 ילדים שווה בשווה. כמה כל ילד יקבל? | 3 |
| new-math-division_grouping-003 | חשבון | כיתה ב׳ | `division_grouping` | American / multiple choice | 4 | 20 עוגיות חולקו ל־4 צלחות שוות. כמה עוגיות בכל צלחת? | 5 |
| new-math-division_grouping-004 | חשבון | כיתה ב׳ | `division_grouping` | American / multiple choice | 4 | 24 גולות חולקו ל־6 שקיות שוות. כמה גולות בכל שקית? | 4 |
| new-math-division_grouping-005 | חשבון | כיתה ג׳ | `division_grouping` | American / multiple choice | 5 | 36 קלפים חולקו ל־9 קבוצות שוות. כמה קלפים בכל קבוצה? | 4 |
| new-math-division_grouping-006 | חשבון | כיתה ג׳ | `division_grouping` | American / multiple choice | 5 | 48 חרוזים חולקו ל־8 שרשראות שוות. כמה חרוזים בכל שרשרת? | 6 |
| new-math-division_by_multiplication_table-001 | חשבון | כיתה ב׳ | `division_by_multiplication_table` | Open input | 3 | כמה זה 20 ÷ 5? | 4 |
| new-math-division_by_multiplication_table-002 | חשבון | כיתה ב׳ | `division_by_multiplication_table` | Open input | 4 | כמה זה 24 ÷ 4? | 6 |
| new-math-division_by_multiplication_table-003 | חשבון | כיתה ב׳ | `division_by_multiplication_table` | Open input | 4 | כמה זה 35 ÷ 5? | 7 |
| new-math-division_by_multiplication_table-004 | חשבון | כיתה ג׳ | `division_by_multiplication_table` | Open input | 5 | כמה זה 42 ÷ 7? | 6 |
| new-math-division_by_multiplication_table-005 | חשבון | כיתה ג׳ | `division_by_multiplication_table` | Open input | 5 | כמה זה 56 ÷ 8? | 7 |
| new-math-division_by_multiplication_table-006 | חשבון | כיתה ג׳ | `division_by_multiplication_table` | Open input | 5 | כמה זה 63 ÷ 9? | 7 |
| new-math-division_by_multiplication_table-007 | חשבון | כיתה ג׳ | `division_by_multiplication_table` | Open input | 5 | כמה זה 72 ÷ 8? | 9 |
| new-math-division_by_multiplication_table-008 | חשבון | כיתה ג׳ | `division_by_multiplication_table` | Open input | 5 | כמה זה 81 ÷ 9? | 9 |
| new-math-one_step_word_problem-001 | חשבון | כיתה א׳ | `one_step_word_problem` | Open input | 2 | לנועה היו 7 מדבקות והיא קיבלה עוד 5. כמה מדבקות יש לה עכשיו? | 12 |
| new-math-one_step_word_problem-002 | חשבון | כיתה ב׳ | `one_step_word_problem` | Open input | 3 | בכיתה היו 18 ילדים. 6 יצאו לחצר. כמה נשארו בכיתה? | 12 |
| new-math-one_step_word_problem-003 | חשבון | כיתה ב׳ | `one_step_word_problem` | Open input | 4 | בכל שקית יש 4 סוכריות. יש 5 שקיות. כמה סוכריות יש בסך הכול? | 20 |
| new-math-one_step_word_problem-006 | חשבון | כיתה ב׳ | `one_step_word_problem` | Open input | 4 | בספר יש 48 עמודים. דנה קראה 20. כמה נשאר לה לקרוא? | 28 |
| new-math-one_step_word_problem-004 | חשבון | כיתה ג׳ | `one_step_word_problem` | Open input | 5 | 36 עפרונות חולקו שווה בשווה בין 6 ילדים. כמה עפרונות קיבל כל ילד? | 6 |
| new-math-one_step_word_problem-005 | חשבון | כיתה ג׳ | `one_step_word_problem` | Open input | 5 | לאורי יש 24 קלפים. לתמר יש 8 פחות. כמה קלפים יש לתמר? | 16 |
| new-math-two_step_word_problem-001 | חשבון | כיתה ב׳ | `two_step_word_problem` | Open input | 3 | ליעל היו 10 מדבקות. היא קיבלה 6 ואז נתנה 4. כמה נשארו לה? | 12 |
| new-math-two_step_word_problem-002 | חשבון | כיתה ב׳ | `two_step_word_problem` | Open input | 4 | במדף היו 25 ספרים. הוסיפו 12 ואז לקחו 7. כמה ספרים נשארו במדף? | 30 |
| new-math-two_step_word_problem-005 | חשבון | כיתה ב׳ | `two_step_word_problem` | Open input | 4 | בגן היו 3 שולחנות ובכל שולחן 5 ילדים. אחר כך הצטרפו עוד 4 ילדים. כמה ילדים יש? | 19 |
| new-math-two_step_word_problem-003 | חשבון | כיתה ג׳ | `two_step_word_problem` | Open input | 5 | בכל קופסה יש 6 עפרונות. יש 4 קופסאות, ואז הוסיפו עוד 5 עפרונות. כמה יש בסך הכול? | 29 |
| new-math-two_step_word_problem-004 | חשבון | כיתה ג׳ | `two_step_word_problem` | Open input | 5 | לכיתה היו 50 שקלים. קנו כדור ב־28 שקלים ואז קיבלו תרומה של 15 שקלים. כמה יש עכשיו? | 37 |
| new-math-two_step_word_problem-006 | חשבון | כיתה ג׳ | `two_step_word_problem` | Open input | 5 | דני קרא 18 עמודים ביום ראשון ו־22 ביום שני. בספר 70 עמודים. כמה נשאר לו לקרוא? | 30 |
| new-math-money_change-001 | חשבון | כיתה א׳ | `money_change` | Open input | 2 | יש לך 10 שקלים וקנית מחברת ב־4 שקלים. כמה עודף תקבל? | 6 שקלים |
| new-math-money_change-002 | חשבון | כיתה ב׳ | `money_change` | Open input | 3 | עיפרון עולה 3 שקלים. קנית 2 עפרונות. כמה שילמת? | 6 שקלים |
| new-math-money_change-003 | חשבון | כיתה ב׳ | `money_change` | Open input | 3 | יש לך 20 שקלים. קנית כריך ב־12 שקלים. כמה עודף תקבל? | 8 שקלים |
| new-math-money_change-004 | חשבון | כיתה ב׳ | `money_change` | Open input | 4 | ספר עולה 27 שקלים. שילמת בשטר של 50. כמה עודף תקבל? | 23 שקלים |
| new-math-money_change-005 | חשבון | כיתה ב׳ | `money_change` | Open input | 4 | קנית שני מוצרים: אחד ב־18 שקלים ואחד ב־25 שקלים. כמה שילמת? | 43 שקלים |
| new-math-money_change-006 | חשבון | כיתה ג׳ | `money_change` | Open input | 5 | יש לך 100 שקלים. קנית משחק ב־64 שקלים ומחברת ב־9 שקלים. כמה נשאר? | 27 שקלים |
| new-math-time_clock-001 | חשבון | כיתה א׳ | `time_clock` | American / multiple choice | 2 | איזו שעה היא שעה אחת אחרי 3:00? | 4:00 |
| new-math-time_clock-002 | חשבון | כיתה ב׳ | `time_clock` | American / multiple choice | 3 | מה השעה חצי שעה אחרי 7:30? | 8:00 |
| new-math-time_clock-003 | חשבון | כיתה ב׳ | `time_clock` | American / multiple choice | 3 | כמה דקות יש בשעה? | 60 |
| new-math-time_clock-004 | חשבון | כיתה ב׳ | `time_clock` | American / multiple choice | 4 | השיעור התחיל ב־10:00 ונמשך 45 דקות. מתי הסתיים? | 10:45 |
| new-math-time_clock-006 | חשבון | כיתה ב׳ | `time_clock` | American / multiple choice | 4 | מה ארוך יותר: 90 דקות או שעה אחת? | 90 דקות |
| new-math-time_clock-005 | חשבון | כיתה ג׳ | `time_clock` | American / multiple choice | 5 | הסרט התחיל ב־16:20 ונמשך 40 דקות. מתי הסתיים? | 17:00 |
| new-math-measurements-001 | חשבון | כיתה א׳ | `measurements` | American / multiple choice | 2 | מה מתאים למדידת אורך עיפרון? | סנטימטרים |
| new-math-measurements-002 | חשבון | כיתה ב׳ | `measurements` | American / multiple choice | 3 | מה ארוך יותר: 1 מטר או 80 סנטימטר? | 1 מטר |
| new-math-measurements-005 | חשבון | כיתה ב׳ | `measurements` | American / multiple choice | 3 | מה מתאים למדידת משקל של תפוח? | גרמים |
| new-math-measurements-003 | חשבון | כיתה ב׳ | `measurements` | American / multiple choice | 4 | כמה סנטימטרים יש במטר אחד? | 100 |
| new-math-measurements-004 | חשבון | כיתה ב׳ | `measurements` | American / multiple choice | 4 | בקבוק מכיל 1 ליטר. שתו חצי ליטר. כמה נשאר? | חצי ליטר |
| new-math-measurements-006 | חשבון | כיתה ג׳ | `measurements` | American / multiple choice | 5 | אורך השולחן 120 ס״מ. כמה זה במטרים וסנטימטרים? | 1 מטר ו־20 ס״מ |
| new-math-simple_fractions_half_third_quarter-001 | חשבון | כיתה ב׳ | `simple_fractions_half_third_quarter` | American / multiple choice | 3 | עוגה חולקה ל־2 חלקים שווים. איך נקרא חלק אחד? | חצי |
| new-math-simple_fractions_half_third_quarter-002 | חשבון | כיתה ב׳ | `simple_fractions_half_third_quarter` | American / multiple choice | 3 | פיצה חולקה ל־4 חלקים שווים. איך נקרא חלק אחד? | רבע |
| new-math-simple_fractions_half_third_quarter-003 | חשבון | כיתה ב׳ | `simple_fractions_half_third_quarter` | American / multiple choice | 4 | אם צובעים 1 מתוך 3 חלקים שווים, איזה שבר זה? | שליש |
| new-math-simple_fractions_half_third_quarter-005 | חשבון | כיתה ב׳ | `simple_fractions_half_third_quarter` | American / multiple choice | 4 | מהו חצי מ־10? | 5 |
| new-math-simple_fractions_half_third_quarter-004 | חשבון | כיתה ג׳ | `simple_fractions_half_third_quarter` | American / multiple choice | 5 | איזה שבר מתאים ל־2 חלקים מתוך 4? | 2/4 |
| new-math-simple_fractions_half_third_quarter-006 | חשבון | כיתה ג׳ | `simple_fractions_half_third_quarter` | American / multiple choice | 5 | מהו רבע מ־12? | 3 |
| new-math-compare_simple_fractions-001 | חשבון | כיתה ב׳ | `compare_simple_fractions` | American / multiple choice | 4 | מה גדול יותר: 1/2 או 1/4? | 1/2 |
| new-math-compare_simple_fractions-002 | חשבון | כיתה ב׳ | `compare_simple_fractions` | American / multiple choice | 4 | מה קטן יותר: 1/3 או 1/2? | 1/3 |
| new-math-compare_simple_fractions-003 | חשבון | כיתה ב׳ | `compare_simple_fractions` | American / multiple choice | 4 | איזה שבר מייצג חלק גדול יותר של אותה עוגה: רבע או חצי? | חצי |
| new-math-compare_simple_fractions-004 | חשבון | כיתה ג׳ | `compare_simple_fractions` | American / multiple choice | 5 | מה גדול יותר: 2/4 או 1/4? | 2/4 |
| new-math-compare_simple_fractions-005 | חשבון | כיתה ג׳ | `compare_simple_fractions` | American / multiple choice | 5 | מה שווה ל־1/2? | 2/4 |
| new-math-compare_simple_fractions-006 | חשבון | כיתה ג׳ | `compare_simple_fractions` | American / multiple choice | 5 | אם מחלקים אותו שלם ליותר חלקים שווים, כל חלק נהיה... | קטן יותר |
| new-math-simple_order_of_operations-001 | חשבון | כיתה ג׳ | `simple_order_of_operations` | Open input | 5 | כמה זה 3 + 4 × 2? | 11 |
| new-math-simple_order_of_operations-002 | חשבון | כיתה ג׳ | `simple_order_of_operations` | Open input | 5 | כמה זה 10 - 2 × 3? | 4 |
| new-math-simple_order_of_operations-003 | חשבון | כיתה ג׳ | `simple_order_of_operations` | Open input | 5 | כמה זה (3 + 4) × 2? | 14 |
| new-math-simple_order_of_operations-004 | חשבון | כיתה ג׳ | `simple_order_of_operations` | Open input | 5 | כמה זה 18 ÷ 3 + 4? | 10 |
| new-math-simple_order_of_operations-005 | חשבון | כיתה ג׳ | `simple_order_of_operations` | Open input | 5 | כמה זה 5 × 2 + 6? | 16 |
| new-math-simple_order_of_operations-006 | חשבון | כיתה ג׳ | `simple_order_of_operations` | Open input | 5 | כמה זה 20 - (4 + 6)? | 10 |
| new-math-numeric_patterns_sequences-001 | חשבון | כיתה ב׳ | `numeric_patterns_sequences` | American / multiple choice | 3 | מה המספר הבא? 2, 4, 6, 8, __ | 10 |
| new-math-numeric_patterns_sequences-002 | חשבון | כיתה ב׳ | `numeric_patterns_sequences` | American / multiple choice | 3 | מה המספר הבא? 5, 10, 15, 20, __ | 25 |
| new-math-numeric_patterns_sequences-003 | חשבון | כיתה ב׳ | `numeric_patterns_sequences` | American / multiple choice | 4 | מה המספר הבא? 1, 2, 4, 8, __ | 16 |
| new-math-numeric_patterns_sequences-005 | חשבון | כיתה ב׳ | `numeric_patterns_sequences` | American / multiple choice | 4 | מה המספר החסר? 7, 10, 13, __, 19 | 16 |
| new-math-numeric_patterns_sequences-004 | חשבון | כיתה ג׳ | `numeric_patterns_sequences` | American / multiple choice | 5 | מה המספר הבא? 3, 6, 12, 24, __ | 48 |
| new-math-numeric_patterns_sequences-006 | חשבון | כיתה ג׳ | `numeric_patterns_sequences` | American / multiple choice | 5 | מה המספר הבא? 1, 4, 9, 16, __ | 25 |
| new-math-early_algebraic_thinking-001 | חשבון | כיתה ב׳ | `early_algebraic_thinking` | American / multiple choice | 3 | מה המספר החסר? 6 + __ = 10 | 4 |
| new-math-early_algebraic_thinking-002 | חשבון | כיתה ב׳ | `early_algebraic_thinking` | American / multiple choice | 4 | מה המספר החסר? __ - 5 = 7 | 12 |
| new-math-early_algebraic_thinking-003 | חשבון | כיתה ב׳ | `early_algebraic_thinking` | American / multiple choice | 4 | אם □ + □ = 12 וכל □ שווה אותו דבר, כמה שווה □? | 6 |
| new-math-early_algebraic_thinking-006 | חשבון | כיתה ב׳ | `early_algebraic_thinking` | American / multiple choice | 4 | מספר גדול ב־9 מ־16. מה המספר? | 25 |
| new-math-early_algebraic_thinking-004 | חשבון | כיתה ג׳ | `early_algebraic_thinking` | American / multiple choice | 5 | מספר כפול 3 שווה 21. מה המספר? | 7 |
| new-math-early_algebraic_thinking-005 | חשבון | כיתה ג׳ | `early_algebraic_thinking` | American / multiple choice | 5 | אם 5 + x = 13, מה x? | 8 |
| new-hebrew-letter_recognition-001 | עברית | כיתה א׳ | `letter_recognition` | American / multiple choice | 1 | איזו אות באה אחרי ב׳? | ג |
| new-hebrew-letter_recognition-002 | עברית | כיתה א׳ | `letter_recognition` | American / multiple choice | 1 | איזו אות באה לפני ה׳? | ד |
| new-hebrew-letter_recognition-003 | עברית | כיתה א׳ | `letter_recognition` | American / multiple choice | 2 | איזו אות סופית מתאימה למילה: שלו__? | ם |
| new-hebrew-letter_recognition-004 | עברית | כיתה א׳ | `letter_recognition` | American / multiple choice | 2 | איזו אות היא אות סופית? | ץ |
| new-hebrew-letter_recognition-005 | עברית | כיתה א׳ | `letter_recognition` | American / multiple choice | 2 | כמה אותיות יש במילה ילד? | 3 |
| new-hebrew-letter_recognition-006 | עברית | כיתה א׳ | `letter_recognition` | American / multiple choice | 2 | בחרו את האות הראשונה במילה תפוח. | ת |
| new-hebrew-opening_closing_sound-001 | עברית | כיתה א׳ | `opening_closing_sound` | American / multiple choice | 1 | איזו מילה מתחילה בצליל מ? | מים |
| new-hebrew-opening_closing_sound-002 | עברית | כיתה א׳ | `opening_closing_sound` | American / multiple choice | 1 | איזו מילה מתחילה בצליל ד? | דלת |
| new-hebrew-opening_closing_sound-003 | עברית | כיתה א׳ | `opening_closing_sound` | American / multiple choice | 2 | איזו מילה מסתיימת בצליל ל? | חתול |
| new-hebrew-opening_closing_sound-004 | עברית | כיתה א׳ | `opening_closing_sound` | American / multiple choice | 2 | מה הצליל הפותח במילה כדור? | כ |
| new-hebrew-opening_closing_sound-005 | עברית | כיתה ב׳ | `opening_closing_sound` | American / multiple choice | 3 | איזו מילה מסתיימת כמו ים? | חיים |
| new-hebrew-opening_closing_sound-006 | עברית | כיתה ב׳ | `opening_closing_sound` | American / multiple choice | 3 | מה הצליל הסוגר במילה ארנב? | ב |
| new-hebrew-word_reading-001 | עברית | כיתה א׳ | `word_reading` | Oral reading | 1 | קרא/י בקול את המילה: בית | קריאה מדויקת של בית |
| new-hebrew-word_reading-002 | עברית | כיתה א׳ | `word_reading` | Oral reading | 1 | קרא/י בקול את המילה: דלת | קריאה מדויקת של דלת |
| new-hebrew-word_reading-003 | עברית | כיתה א׳ | `word_reading` | Oral reading | 2 | קרא/י בקול: חתול | קריאה מדויקת של חתול |
| new-hebrew-word_reading-004 | עברית | כיתה ב׳ | `word_reading` | Oral reading | 3 | קרא/י בקול: משחקים | קריאה מדויקת של משחקים |
| new-hebrew-word_reading-005 | עברית | כיתה ב׳ | `word_reading` | Oral reading | 4 | קרא/י בקול: התרגשות | קריאה מדויקת של התרגשות |
| new-hebrew-word_reading-006 | עברית | כיתה ג׳ | `word_reading` | Oral reading | 5 | קרא/י בקול: אחריות | קריאה מדויקת של אחריות |
| new-hebrew-sentence_reading-001 | עברית | כיתה א׳ | `sentence_reading` | Oral reading | 1 | קרא/י בקול: הילד רץ. | קריאה מדויקת של המשפט |
| new-hebrew-sentence_reading-002 | עברית | כיתה א׳ | `sentence_reading` | Oral reading | 2 | קרא/י בקול: דנה אכלה תפוח. | קריאה מדויקת של המשפט |
| new-hebrew-sentence_reading-003 | עברית | כיתה ב׳ | `sentence_reading` | Oral reading | 3 | קרא/י בקול: הכלב הקטן ישן ליד הדלת. | קריאה מדויקת של המשפט |
| new-hebrew-sentence_reading-004 | עברית | כיתה ב׳ | `sentence_reading` | Oral reading | 4 | קרא/י בקול: ביום הגשום לקחתי מטרייה לבית הספר. | קריאה מדויקת של המשפט |
| new-hebrew-sentence_reading-005 | עברית | כיתה ג׳ | `sentence_reading` | Oral reading | 5 | קרא/י בקול: למרות שהמשחק היה קשה, הילדים המשיכו לנסות. | קריאה מדויקת של המשפט |
| new-hebrew-sentence_reading-006 | עברית | כיתה ג׳ | `sentence_reading` | Oral reading | 5 | קרא/י בקול: אחרי שסיימה לקרוא, נועה כתבה המלצה לחבריה. | קריאה מדויקת של המשפט |
| new-hebrew-reading_fluency-001 | עברית | כיתה א׳ | `reading_fluency` | Oral reading | 2 | קרא/י בקול במשך דקה: רוני יצא לחצר. הוא מצא עלה גדול והראה אותו לחבריו. | רוב המילים נקראו נכון ובקצב מתאים |
| new-hebrew-reading_fluency-002 | עברית | כיתה ב׳ | `reading_fluency` | Oral reading | 3 | קרא/י בקול: בבוקר ירד גשם חזק. הילדים נכנסו לכיתה והניחו את המטריות ליד הדלת. | קריאה מדויקת וזורמת |
| new-hebrew-reading_fluency-003 | עברית | כיתה ב׳ | `reading_fluency` | Oral reading | 4 | קרא/י בקול: יעל רצתה לבנות מגדל מקוביות. בכל פעם שהמגדל נפל, היא ניסתה דרך אחרת. | קריאה זורמת עם הבנה |
| new-hebrew-reading_fluency-004 | עברית | כיתה ב׳ | `reading_fluency` | Oral reading | 4 | קרא/י בקול: כשהגיע החורף, הציפורים חיפשו מקום חמים יותר. חלקן נדדו למרחקים גדולים. | קריאה מדויקת בקצב סביר |
| new-hebrew-reading_fluency-005 | עברית | כיתה ג׳ | `reading_fluency` | Oral reading | 5 | קרא/י בקול: התלמידים ערכו ניסוי קטן כדי לבדוק אילו חומרים צפים ואילו שוקעים. | קריאה עצמאית של טקסט מידע |
| new-hebrew-reading_fluency-006 | עברית | כיתה ג׳ | `reading_fluency` | Oral reading | 5 | קרא/י בקול: למרות שהשאלה נראתה מסובכת, עידו חילק אותה לחלקים קטנים ופתר אותה. | קריאה זורמת עם מבנה תחבירי מורכב |
| new-hebrew-reading_explicit_detail-001 | עברית | כיתה א׳ | `reading_explicit_detail` | American / multiple choice | 2 | קראו: מיה לקחה כדור אדום לחצר ושיחקה עם תמר. איזה צבע היה הכדור? | אדום |
| new-hebrew-reading_explicit_detail-002 | עברית | כיתה א׳ | `reading_explicit_detail` | American / multiple choice | 2 | קראו: אורי שם את הספר בתיק לפני שיצא לבית הספר. איפה אורי שם את הספר? | בתיק |
| new-hebrew-reading_explicit_detail-003 | עברית | כיתה ב׳ | `reading_explicit_detail` | American / multiple choice | 3 | קראו: ביום שישי אפתה המשפחה עוגת שוקולד. מה אפתה המשפחה? | עוגת שוקולד |
| new-hebrew-reading_explicit_detail-004 | עברית | כיתה ב׳ | `reading_explicit_detail` | American / multiple choice | 3 | קראו: הטיול התחיל ליד הנחל והסתיים בחורשה. איפה התחיל הטיול? | ליד הנחל |
| new-hebrew-reading_explicit_detail-005 | עברית | כיתה ב׳ | `reading_explicit_detail` | American / multiple choice | 4 | קראו: דניאל בחר בספר על חלל כי הוא אוהב כוכבים. על מה היה הספר? | חלל |
| new-hebrew-reading_explicit_detail-006 | עברית | כיתה ב׳ | `reading_explicit_detail` | American / multiple choice | 4 | קראו: המורה ביקשה להביא מחברת, עיפרון וסרגל לשיעור מדעים. איזה חפץ לא הוזכר? | מספריים |
| new-hebrew-reading_simple_inference-002 | עברית | כיתה א׳ | `reading_simple_inference` | American / multiple choice | 2 | קראו: נועה חייכה כשראתה את המתנה. איך כנראה נועה הרגישה? | שמחה |
| new-hebrew-reading_simple_inference-001 | עברית | כיתה ב׳ | `reading_simple_inference` | American / multiple choice | 3 | קראו: השמיים התקדרו, ורוני פתח מטרייה. מה כנראה קרה? | התחיל לרדת גשם |
| new-hebrew-reading_simple_inference-003 | עברית | כיתה ב׳ | `reading_simple_inference` | American / multiple choice | 3 | קראו: הילדים לבשו מעילים וכובעים לפני שיצאו. איזו עונה כנראה הייתה? | חורף |
| new-hebrew-reading_simple_inference-004 | עברית | כיתה ב׳ | `reading_simple_inference` | American / multiple choice | 4 | קראו: הכלב נבח ליד הדלת, ואז אבא פתח אותה. מה הכלב רצה כנראה? | לצאת או שמישהו יפתח לו |
| new-hebrew-reading_simple_inference-006 | עברית | כיתה ב׳ | `reading_simple_inference` | American / multiple choice | 4 | קראו: הכיתה הייתה שקטה מאוד בזמן שהמורה הקריאה סיפור. מה אפשר להסיק? | הילדים הקשיבו לסיפור |
| new-hebrew-reading_simple_inference-005 | עברית | כיתה ג׳ | `reading_simple_inference` | American / multiple choice | 5 | קראו: אמיר בדק שוב את התשובה לפני שהגיש את הדף. מה אפשר ללמוד על אמיר? | שהוא זהיר ורוצה לדייק |
| new-hebrew-reading_text_evidence-001 | עברית | כיתה ב׳ | `reading_text_evidence` | Open input | 3 | קראו: דנה לקחה בקבוק מים כי היה יום חם. למה דנה לקחה מים? נמקו מהמילים בטקסט. | כי היה יום חם |
| new-hebrew-reading_text_evidence-002 | עברית | כיתה ב׳ | `reading_text_evidence` | Open input | 4 | קראו: איתי חזר על התרגיל כמה פעמים עד שהצליח. איך יודעים שאיתי התמיד? | כתוב שהוא חזר על התרגיל כמה פעמים |
| new-hebrew-reading_text_evidence-003 | עברית | כיתה ב׳ | `reading_text_evidence` | Open input | 4 | קראו: העץ התכופף ברוח החזקה. איך יודעים שהרוח הייתה חזקה? | העץ התכופף |
| new-hebrew-reading_text_evidence-005 | עברית | כיתה ב׳ | `reading_text_evidence` | Open input | 4 | קראו: הגור רעד, ולכן יואב הביא לו שמיכה. למה יואב הביא שמיכה? הביאו הוכחה. | כי הגור רעד |
| new-hebrew-reading_text_evidence-004 | עברית | כיתה ג׳ | `reading_text_evidence` | Open input | 5 | קראו: מיכל שמרה את הסוד ולא סיפרה לאף אחד. איך יודעים שמיכל הייתה נאמנה? | היא לא סיפרה לאף אחד |
| new-hebrew-reading_text_evidence-006 | עברית | כיתה ג׳ | `reading_text_evidence` | American / multiple choice | 5 | קראו: למרות שהשאלה הייתה קשה, נועה ניסתה דרך אחרת. איזו מילה מראה שהייתה בעיה? | קשה |
| new-hebrew-vocabulary_context-001 | עברית | כיתה ב׳ | `vocabulary_context` | American / multiple choice | 3 | קראו: החתול הסתתר מתחת לשולחן. מה פירוש הסתתר? | נחבא |
| new-hebrew-vocabulary_context-002 | עברית | כיתה ב׳ | `vocabulary_context` | American / multiple choice | 3 | קראו: הילדים התרגשו לקראת הטיול. מה פירוש התרגשו? | הרגישו שמחה וציפייה |
| new-hebrew-vocabulary_context-003 | עברית | כיתה ב׳ | `vocabulary_context` | American / multiple choice | 4 | קראו: המגדל קרס כאשר הרוח נשבה. מה פירוש קרס? | נפל |
| new-hebrew-vocabulary_context-005 | עברית | כיתה ב׳ | `vocabulary_context` | American / multiple choice | 4 | קראו: המים היו צלולים ואפשר היה לראות את האבנים בתחתית. מה פירוש צלולים? | נקיים ושקופים |
| new-hebrew-vocabulary_context-004 | עברית | כיתה ג׳ | `vocabulary_context` | American / multiple choice | 5 | קראו: רוני בחן את התמונה בקפידה. מה פירוש בקפידה? | בזהירות ובתשומת לב |
| new-hebrew-vocabulary_context-006 | עברית | כיתה ג׳ | `vocabulary_context` | American / multiple choice | 5 | קראו: אמא ביקשה מדניאל לדחות את המשחק לאחרי השיעורים. מה פירוש לדחות? | לעשות מאוחר יותר |
| new-hebrew-synonyms-001 | עברית | כיתה א׳ | `synonyms` | American / multiple choice | 2 | מה מילה נרדפת לשמח? | מאושר |
| new-hebrew-synonyms-002 | עברית | כיתה א׳ | `synonyms` | American / multiple choice | 2 | מה מילה נרדפת לגדול? | ענק |
| new-hebrew-synonyms-003 | עברית | כיתה ב׳ | `synonyms` | American / multiple choice | 3 | מה מילה נרדפת למהיר? | זריז |
| new-hebrew-synonyms-004 | עברית | כיתה ב׳ | `synonyms` | American / multiple choice | 3 | מה מילה נרדפת לחכם? | נבון |
| new-hebrew-synonyms-005 | עברית | כיתה ב׳ | `synonyms` | American / multiple choice | 4 | מה מילה נרדפת להתבונן? | הסתכל |
| new-hebrew-synonyms-006 | עברית | כיתה ג׳ | `synonyms` | American / multiple choice | 5 | מה מילה נרדפת להתמיד? | להמשיך בעקביות |
| new-hebrew-antonyms-001 | עברית | כיתה א׳ | `antonyms` | American / multiple choice | 1 | מה ההפך של חם? | קר |
| new-hebrew-antonyms-002 | עברית | כיתה א׳ | `antonyms` | American / multiple choice | 1 | מה ההפך של למעלה? | למטה |
| new-hebrew-antonyms-004 | עברית | כיתה א׳ | `antonyms` | American / multiple choice | 2 | מה ההפך של שקט? | רועש |
| new-hebrew-antonyms-003 | עברית | כיתה ב׳ | `antonyms` | American / multiple choice | 3 | מה ההפך של רחב? | צר |
| new-hebrew-antonyms-005 | עברית | כיתה ב׳ | `antonyms` | American / multiple choice | 4 | מה ההפך של להתחיל? | לסיים |
| new-hebrew-antonyms-006 | עברית | כיתה ג׳ | `antonyms` | American / multiple choice | 5 | מה ההפך של נדיב? | קמצן |
| new-hebrew-connectives-006 | עברית | כיתה א׳ | `connectives` | American / multiple choice | 2 | בחרו: אני אוהב תפוחים ___ אגסים. | וגם |
| new-hebrew-connectives-001 | עברית | כיתה ב׳ | `connectives` | American / multiple choice | 3 | בחרו מילת קישור מתאימה: רציתי לצאת, ___ ירד גשם. | אבל |
| new-hebrew-connectives-002 | עברית | כיתה ב׳ | `connectives` | American / multiple choice | 3 | בחרו: לקחתי מטרייה ___ ירד גשם. | כי |
| new-hebrew-connectives-004 | עברית | כיתה ב׳ | `connectives` | American / multiple choice | 3 | בחרו: סיימתי שיעורים ___ הלכתי לשחק. | ואז |
| new-hebrew-connectives-003 | עברית | כיתה ב׳ | `connectives` | American / multiple choice | 4 | בחרו: ירד גשם, ___ נשארנו בבית. | לכן |
| new-hebrew-connectives-005 | עברית | כיתה ג׳ | `connectives` | American / multiple choice | 5 | בחרו: ___ שהיה קשה, נועה המשיכה לנסות. | למרות |
| new-hebrew-gender_masculine_feminine-001 | עברית | כיתה א׳ | `gender_masculine_feminine` | American / multiple choice | 2 | בחרו נכון: ילד ___ | שמח |
| new-hebrew-gender_masculine_feminine-002 | עברית | כיתה א׳ | `gender_masculine_feminine` | American / multiple choice | 2 | בחרו נכון: ילדה ___ | שמחה |
| new-hebrew-gender_masculine_feminine-003 | עברית | כיתה א׳ | `gender_masculine_feminine` | American / multiple choice | 2 | בחרו נכון: חתול ___ | קטן |
| new-hebrew-gender_masculine_feminine-004 | עברית | כיתה ב׳ | `gender_masculine_feminine` | American / multiple choice | 3 | בחרו נכון: מחברת ___ | חדשה |
| new-hebrew-gender_masculine_feminine-005 | עברית | כיתה ב׳ | `gender_masculine_feminine` | American / multiple choice | 3 | בחרו נכון: השולחן ___ | גבוה |
| new-hebrew-gender_masculine_feminine-006 | עברית | כיתה ב׳ | `gender_masculine_feminine` | American / multiple choice | 4 | בחרו נכון: הדרך ___ | ארוכה |
| new-hebrew-singular_plural-001 | עברית | כיתה א׳ | `singular_plural` | American / multiple choice | 2 | מה הרבים של ילד? | ילדים |
| new-hebrew-singular_plural-002 | עברית | כיתה א׳ | `singular_plural` | American / multiple choice | 2 | מה הרבים של ספר? | ספרים |
| new-hebrew-singular_plural-003 | עברית | כיתה ב׳ | `singular_plural` | American / multiple choice | 3 | מה היחיד של כיסאות? | כיסא |
| new-hebrew-singular_plural-004 | עברית | כיתה ב׳ | `singular_plural` | American / multiple choice | 3 | מה הרבים של מחברת? | מחברות |
| new-hebrew-singular_plural-005 | עברית | כיתה ב׳ | `singular_plural` | American / multiple choice | 4 | מה היחיד של חלונות? | חלון |
| new-hebrew-singular_plural-006 | עברית | כיתה ג׳ | `singular_plural` | American / multiple choice | 5 | בחרו משפט נכון: ___ על השולחן. | שלושה ספרים |
| new-hebrew-basic_verb_tense-001 | עברית | כיתה ב׳ | `basic_verb_tense` | American / multiple choice | 3 | איזו מילה מתאימה לאתמול? אתמול דנה ___ | שיחקה |
| new-hebrew-basic_verb_tense-002 | עברית | כיתה ב׳ | `basic_verb_tense` | American / multiple choice | 3 | איזו מילה מתאימה לעכשיו? עכשיו דנה ___ | משחקת |
| new-hebrew-basic_verb_tense-003 | עברית | כיתה ב׳ | `basic_verb_tense` | American / multiple choice | 3 | איזו מילה מתאימה למחר? מחר דנה ___ | תשחק |
| new-hebrew-basic_verb_tense-004 | עברית | כיתה ב׳ | `basic_verb_tense` | American / multiple choice | 4 | בחרו נכון: אתמול הילדים ___ בחצר. | שיחקו |
| new-hebrew-basic_verb_tense-005 | עברית | כיתה ב׳ | `basic_verb_tense` | American / multiple choice | 4 | בחרו נכון: עכשיו הילדים ___ בחצר. | משחקים |
| new-hebrew-basic_verb_tense-006 | עברית | כיתה ג׳ | `basic_verb_tense` | American / multiple choice | 5 | בחרו נכון: מחר הילדים ___ בחצר. | ישחקו |
| new-hebrew-punctuation-001 | עברית | כיתה א׳ | `punctuation` | American / multiple choice | 2 | איזה סימן מתאים בסוף שאלה? מה שמך__ | ? |
| new-hebrew-punctuation-002 | עברית | כיתה א׳ | `punctuation` | American / multiple choice | 2 | איזה סימן מתאים בסוף משפט רגיל? דנה הלכה לבית הספר__ | . |
| new-hebrew-punctuation-003 | עברית | כיתה ב׳ | `punctuation` | American / multiple choice | 3 | איזה סימן מתאים לקריאה חזקה? איזה יופי__ | ! |
| new-hebrew-punctuation-004 | עברית | כיתה ב׳ | `punctuation` | American / multiple choice | 4 | איפה כדאי לשים פסיק? קניתי תפוחים אגסים ובננות | אחרי תפוחים |
| new-hebrew-punctuation-005 | עברית | כיתה ג׳ | `punctuation` | American / multiple choice | 5 | בחרו משפט שמפוסק נכון. | נועה קראה ספר, ואז כתבה במחברת. |
| new-hebrew-punctuation-006 | עברית | כיתה ג׳ | `punctuation` | American / multiple choice | 5 | איזה סימן מתאים אחרי פנייה? אמא__ אפשר מים? | , |
| new-hebrew-sentence_writing-001 | עברית | כיתה א׳ | `sentence_writing` | Writing prompt | 2 | כתבו משפט עם המילה בית. | משפט תקין הכולל את המילה בית |
| new-hebrew-sentence_writing-002 | עברית | כיתה א׳ | `sentence_writing` | Writing prompt | 2 | כתבו משפט על כלב. | משפט תקין על כלב |
| new-hebrew-sentence_writing-003 | עברית | כיתה ב׳ | `sentence_writing` | Writing prompt | 3 | כתבו משפט שמתחיל ב־היום. | משפט תקין שמתחיל בהיום |
| new-hebrew-sentence_writing-004 | עברית | כיתה ב׳ | `sentence_writing` | Writing prompt | 4 | כתבו משפט שמכיל את המילים כי וחבר. | משפט תקין עם כי וחבר |
| new-hebrew-sentence_writing-006 | עברית | כיתה ב׳ | `sentence_writing` | Writing prompt | 4 | כתבו משפט עם תיאור זמן, למשל אחרי השיעור. | משפט תקין עם תיאור זמן |
| new-hebrew-sentence_writing-005 | עברית | כיתה ג׳ | `sentence_writing` | Writing prompt | 5 | כתבו משפט שמסביר למה כדאי לקרוא ספרים. | משפט נימוק תקין |
| new-hebrew-paragraph_writing-001 | עברית | כיתה ב׳ | `paragraph_writing` | Writing prompt | 3 | כתבו 3 משפטים על יום כיף שהיה לכם. | פסקה קצרה מובנת |
| new-hebrew-paragraph_writing-002 | עברית | כיתה ב׳ | `paragraph_writing` | Writing prompt | 4 | כתבו פסקה קצרה שממליצה על ספר או משחק שאהבתם. | פסקת המלצה עם סיבה |
| new-hebrew-paragraph_writing-003 | עברית | כיתה ב׳ | `paragraph_writing` | Writing prompt | 4 | כתבו 4–5 משפטים על חיה שאתם אוהבים. | פסקה מאורגנת על חיה |
| new-hebrew-paragraph_writing-004 | עברית | כיתה ג׳ | `paragraph_writing` | Writing prompt | 5 | כתבו פסקה שמתחילה ב־בהתחלה ומסתיימת ב־בסוף. | פסקה עם רצף אירועים |
| new-hebrew-paragraph_writing-005 | עברית | כיתה ג׳ | `paragraph_writing` | Writing prompt | 5 | כתבו פסקה שמסבירה למה חשוב להתאמן במשהו חדש. | פסקת הסבר/דעה |
| new-hebrew-paragraph_writing-006 | עברית | כיתה ג׳ | `paragraph_writing` | Writing prompt | 5 | כתבו פסקה על בעיה קטנה שפתרתם ואיך פתרתם אותה. | פסקה עם בעיה ופתרון |
| new-hebrew-story_text_structure-001 | עברית | כיתה ב׳ | `story_text_structure` | American / multiple choice | 3 | בסיפור קצר, מה בדרך כלל בא קודם? | פתיחה |
| new-hebrew-story_text_structure-003 | עברית | כיתה ב׳ | `story_text_structure` | American / multiple choice | 3 | קראו: יואב איבד את הכדור. הוא חיפש בחצר ומצא אותו ליד העץ. מה הייתה הבעיה? | יואב איבד את הכדור |
| new-hebrew-story_text_structure-002 | עברית | כיתה ב׳ | `story_text_structure` | American / multiple choice | 4 | איזה חלק בסיפור מציג את הבעיה? | האמצע/הסתבכות |
| new-hebrew-story_text_structure-004 | עברית | כיתה ב׳ | `story_text_structure` | American / multiple choice | 4 | קראו: נועה פחדה לעלות לבמה, אבל חברתה עודדה אותה. מה עזר לנועה? | חברתה עודדה אותה |
| new-hebrew-story_text_structure-006 | עברית | כיתה ב׳ | `story_text_structure` | American / multiple choice | 4 | מה צריך להופיע בסוף סיפור טוב? | סיום או פתרון |
| new-hebrew-story_text_structure-005 | עברית | כיתה ג׳ | `story_text_structure` | American / multiple choice | 5 | איזו כותרת מתאימה לסיפור על ילד שמאבד כלב ואז מוצא אותו? | הכלב שחזר הביתה |
| new-hebrew-information_text_structure-001 | עברית | כיתה ב׳ | `information_text_structure` | American / multiple choice | 3 | מה מטרת טקסט מידע? | ללמד או להסביר עובדות |
| new-hebrew-information_text_structure-003 | עברית | כיתה ב׳ | `information_text_structure` | American / multiple choice | 3 | איזו כותרת מתאימה לטקסט על איך צמחים גדלים? | איך צמחים גדלים |
| new-hebrew-information_text_structure-002 | עברית | כיתה ב׳ | `information_text_structure` | American / multiple choice | 4 | איזה משפט הוא עובדה? | לחתול יש שפם. |
| new-hebrew-information_text_structure-005 | עברית | כיתה ב׳ | `information_text_structure` | American / multiple choice | 4 | איזה משפט מתאים לטקסט מידע על מים? | מים יכולים להיות נוזל, קרח או אדים. |
| new-hebrew-information_text_structure-004 | עברית | כיתה ג׳ | `information_text_structure` | American / multiple choice | 5 | בטקסט מידע, איפה נצפה למצוא הסבר למילה חדשה? | במשפט סביב המילה או במילון/הערה |
| new-hebrew-information_text_structure-006 | עברית | כיתה ג׳ | `information_text_structure` | American / multiple choice | 5 | מה עוזר להבין טקסט מידע? | כותרות, תמונות ומילות מפתח |
| new-hebrew-multi_step_instructions-001 | עברית | כיתה ב׳ | `multi_step_instructions` | American / multiple choice | 3 | בצעו לפי ההוראה: בחרו את המילה שמתחילה באות ב ואז סמנו את המילה הארוכה ביותר. מילים: בית, דג, בלון. | בלון |
| new-hebrew-multi_step_instructions-002 | עברית | כיתה ב׳ | `multi_step_instructions` | American / multiple choice | 3 | סמנו את המספר הגדול מ־10 וקטן מ־15: 8, 12, 16, 20 | 12 |
| new-hebrew-multi_step_instructions-003 | עברית | כיתה ב׳ | `multi_step_instructions` | American / multiple choice | 4 | בחרו את הצורה שאינה עיגול ואינה משולש: עיגול, משולש, ריבוע, עיגול. | ריבוע |
| new-hebrew-multi_step_instructions-004 | עברית | כיתה ב׳ | `multi_step_instructions` | American / multiple choice | 4 | קראו את ההוראה: סמנו את המילה השנייה רק אם היא מתחילה באות מ. מילים: שמש, מים, ילד. | מים |
| new-hebrew-multi_step_instructions-005 | עברית | כיתה ג׳ | `multi_step_instructions` | American / multiple choice | 5 | בחרו את המספר הזוגי שנמצא בין 20 ל־30 וגם מתחלק ב־5: 22, 25, 30, 35 | 30 |
| new-hebrew-multi_step_instructions-006 | עברית | כיתה ג׳ | `multi_step_instructions` | American / multiple choice | 5 | סמנו את המילה שאינה חיה ואינה כלי כתיבה: כלב, עיפרון, שולחן, חתול. | שולחן |
| new-science-animals-001 | מדעים | כיתה א׳ | `animals` | American / multiple choice | 2 | איזו חיה היא יונק? | כלב |
| new-science-animals-003 | מדעים | כיתה א׳ | `animals` | American / multiple choice | 2 | איזו חיה מטילה ביצים? | תרנגולת |
| new-science-animals-002 | מדעים | כיתה ב׳ | `animals` | American / multiple choice | 3 | מה עוזר לדג לנשום במים? | זימים |
| new-science-animals-004 | מדעים | כיתה ב׳ | `animals` | American / multiple choice | 3 | למה לציפור יש כנפיים? | לעוף או לנוע באוויר |
| new-science-animals-006 | מדעים | כיתה ב׳ | `animals` | American / multiple choice | 4 | מה משותף לפרפר, נמלה ודבורה? | כולם חרקים |
| new-science-animals-005 | מדעים | כיתה ג׳ | `animals` | American / multiple choice | 5 | מהי התאמה של גמל לחיים במדבר? | יכול לשמור מים ולהתמודד עם חום |
| new-science-plants-001 | מדעים | כיתה א׳ | `plants` | American / multiple choice | 2 | מה צמח צריך כדי לגדול? | מים, אור ואדמה/מקום מתאים |
| new-science-plants-002 | מדעים | כיתה ב׳ | `plants` | American / multiple choice | 3 | איזה חלק בצמח קולט מים מהאדמה? | שורשים |
| new-science-plants-004 | מדעים | כיתה ב׳ | `plants` | American / multiple choice | 3 | למה משמשים זרעים? | ליצירת צמח חדש |
| new-science-plants-003 | מדעים | כיתה ב׳ | `plants` | American / multiple choice | 4 | איזה חלק בצמח עוזר להכין מזון בעזרת אור? | עלים |
| new-science-plants-005 | מדעים | כיתה ב׳ | `plants` | American / multiple choice | 4 | מה יקרה לצמח שלא יקבל אור זמן רב? | יתקשה לגדול או ייחלש |
| new-science-plants-006 | מדעים | כיתה ג׳ | `plants` | American / multiple choice | 5 | איזו טענה היא ניסוי טוב? לשים שני צמחים זהים, אחד באור ואחד בחושך, ולהשקות אותו דבר. | כן, בודקים רק את השפעת האור |
| new-science-human_body-001 | מדעים | כיתה א׳ | `human_body` | American / multiple choice | 1 | איזה איבר עוזר לנו לראות? | עיניים |
| new-science-human_body-002 | מדעים | כיתה א׳ | `human_body` | American / multiple choice | 1 | איזה איבר עוזר לנו לשמוע? | אוזניים |
| new-science-human_body-003 | מדעים | כיתה ב׳ | `human_body` | American / multiple choice | 3 | מה תפקיד הלב? | להזרים דם בגוף |
| new-science-human_body-004 | מדעים | כיתה ב׳ | `human_body` | American / multiple choice | 4 | למה אנחנו צריכים לאכול מזון מגוון? | כדי לקבל אנרגיה וחומרים שהגוף צריך |
| new-science-human_body-005 | מדעים | כיתה ב׳ | `human_body` | American / multiple choice | 4 | מה קורה לנשימה בזמן ריצה? | היא נעשית מהירה יותר |
| new-science-human_body-006 | מדעים | כיתה ג׳ | `human_body` | American / multiple choice | 5 | איזה משפט מתאר קשר בין שרירים לעצמות? | השרירים עוזרים להזיז את העצמות |
| new-science-materials_properties-001 | מדעים | כיתה א׳ | `materials_properties` | American / multiple choice | 2 | איזה חומר בדרך כלל שקוף? | זכוכית |
| new-science-materials_properties-002 | מדעים | כיתה ב׳ | `materials_properties` | American / multiple choice | 3 | איזה חומר נמשך למגנט? | ברזל |
| new-science-materials_properties-004 | מדעים | כיתה ב׳ | `materials_properties` | American / multiple choice | 3 | איזה חומר מתאים להכנת חלון? | זכוכית |
| new-science-materials_properties-003 | מדעים | כיתה ב׳ | `materials_properties` | American / multiple choice | 4 | מה פירוש חומר גמיש? | אפשר לכופף אותו והוא יכול לחזור לצורה |
| new-science-materials_properties-006 | מדעים | כיתה ב׳ | `materials_properties` | American / multiple choice | 4 | איזה זוג תכונות מתאים לגומי? | גמיש ואטום |
| new-science-materials_properties-005 | מדעים | כיתה ג׳ | `materials_properties` | American / multiple choice | 5 | למה משתמשים במתכת לסיר? | כי היא חזקה ומוליכה חום |
| new-science-water_states-001 | מדעים | כיתה א׳ | `water_states` | American / multiple choice | 2 | מה קורה למים כשהם קופאים? | הם הופכים לקרח |
| new-science-water_states-002 | מדעים | כיתה א׳ | `water_states` | American / multiple choice | 2 | מה קורה לקרח כשהוא מתחמם? | הוא נמס למים |
| new-science-water_states-006 | מדעים | כיתה ב׳ | `water_states` | American / multiple choice | 3 | באיזה מצב צבירה המים מקבלים את צורת הכלי? | נוזל |
| new-science-water_states-003 | מדעים | כיתה ב׳ | `water_states` | American / multiple choice | 4 | איך נקרא מצב הצבירה של אדים? | גז |
| new-science-water_states-004 | מדעים | כיתה ב׳ | `water_states` | American / multiple choice | 4 | מה גורם לשלולית להתייבש בשמש? | אידוי |
| new-science-water_states-005 | מדעים | כיתה ג׳ | `water_states` | American / multiple choice | 5 | איזה רצף נכון? קרח מתחמם ⇒ מים ⇒ אדים | מוצק ⇒ נוזל ⇒ גז |
| new-science-weather-002 | מדעים | כיתה א׳ | `weather` | American / multiple choice | 1 | מה מתאים ליום גשום? | עננים וגשם |
| new-science-weather-004 | מדעים | כיתה א׳ | `weather` | American / multiple choice | 2 | למה בקיץ לובשים לעיתים בגדים קלים? | כי חם יותר |
| new-science-weather-001 | מדעים | כיתה ב׳ | `weather` | American / multiple choice | 3 | איזה כלי מודד טמפרטורה? | מדחום |
| new-science-weather-003 | מדעים | כיתה ב׳ | `weather` | American / multiple choice | 4 | מה גורם לצל? | אור שנחסם על ידי גוף |
| new-science-weather-005 | מדעים | כיתה ב׳ | `weather` | American / multiple choice | 4 | מהי תחזית מזג אוויר? | ניסיון לחזות איך יהיה מזג האוויר |
| new-science-weather-006 | מדעים | כיתה ג׳ | `weather` | American / multiple choice | 5 | איזה תנאי יכול ליצור קשת בענן? | שמש וטיפות מים באוויר |
| new-science-space-001 | מדעים | כיתה א׳ | `space` | American / multiple choice | 1 | מהו הגוף שמאיר לנו ביום? | השמש |
| new-science-space-002 | מדעים | כיתה ב׳ | `space` | American / multiple choice | 3 | מה מקיף את כדור הארץ? | הירח |
| new-science-space-006 | מדעים | כיתה ב׳ | `space` | American / multiple choice | 3 | מה גדול יותר: כדור הארץ או הירח? | כדור הארץ |
| new-science-space-003 | מדעים | כיתה ב׳ | `space` | American / multiple choice | 4 | מהי פלנטה? | כוכב לכת שמקיף כוכב |
| new-science-space-004 | מדעים | כיתה ג׳ | `space` | American / multiple choice | 5 | למה יש יום ולילה? | כדור הארץ מסתובב סביב עצמו |
| new-science-space-005 | מדעים | כיתה ג׳ | `space` | American / multiple choice | 5 | איזה כוכב לכת ידוע ככוכב האדום? | מאדים |
| new-science-environment-001 | מדעים | כיתה א׳ | `environment` | American / multiple choice | 2 | מה כדאי לעשות עם בקבוק פלסטיק ריק? | למחזר אם אפשר |
| new-science-environment-004 | מדעים | כיתה א׳ | `environment` | American / multiple choice | 2 | איזו פעולה עוזרת לסביבה? | לזרוק פסולת לפח |
| new-science-environment-003 | מדעים | כיתה ב׳ | `environment` | American / multiple choice | 3 | למה חשוב לחסוך במים? | כי מים הם משאב חשוב ומוגבל |
| new-science-environment-002 | מדעים | כיתה ב׳ | `environment` | American / multiple choice | 4 | מהי סביבה טבעית? | מקום שבו חיים יצורים חיים עם תנאים סביבם |
| new-science-environment-005 | מדעים | כיתה ג׳ | `environment` | American / multiple choice | 5 | מה יכול לקרות אם מזהמים נחל? | בעלי חיים וצמחים עלולים להיפגע |
| new-science-environment-006 | מדעים | כיתה ג׳ | `environment` | American / multiple choice | 5 | מהי שרשרת מזון פשוטה? | קשר שבו יצור אחד נאכל על ידי יצור אחר |
| new-knowledge-basic_geography-004 | ידע כללי | כיתה א׳ | `basic_geography` | American / multiple choice | 2 | איזה כיוון נמצא מול צפון? | דרום |
| new-knowledge-basic_geography-002 | ידע כללי | כיתה ב׳ | `basic_geography` | American / multiple choice | 3 | איזה ים נמצא ממערב לישראל? | הים התיכון |
| new-knowledge-basic_geography-005 | ידע כללי | כיתה ב׳ | `basic_geography` | American / multiple choice | 3 | מה מסמן צבע כחול במפה בדרך כלל? | מים |
| new-knowledge-basic_geography-006 | ידע כללי | כיתה ב׳ | `basic_geography` | American / multiple choice | 3 | איזו עיר נמצאת ליד הים: אילת או ירושלים? | אילת |
| new-knowledge-basic_geography-001 | ידע כללי | כיתה ב׳ | `basic_geography` | American / multiple choice | 4 | באיזו יבשת נמצאת ישראל? | אסיה |
| new-knowledge-basic_geography-003 | ידע כללי | כיתה ג׳ | `basic_geography` | American / multiple choice | 5 | מהו המקום הנמוך ביותר בישראל? | ים המלח |
| new-knowledge-holidays-001 | ידע כללי | כיתה א׳ | `holidays` | American / multiple choice | 2 | באיזה חג אוכלים מצות? | פסח |
| new-knowledge-holidays-002 | ידע כללי | כיתה א׳ | `holidays` | American / multiple choice | 2 | באיזה חג מדליקים חנוכייה? | חנוכה |
| new-knowledge-holidays-003 | ידע כללי | כיתה ב׳ | `holidays` | American / multiple choice | 3 | באיזה חג יושבים בסוכה? | סוכות |
| new-knowledge-holidays-004 | ידע כללי | כיתה ב׳ | `holidays` | American / multiple choice | 3 | באיזה חג קוראים מגילה ולובשים תחפושות? | פורים |
| new-knowledge-holidays-005 | ידע כללי | כיתה ב׳ | `holidays` | American / multiple choice | 3 | איזה חג קשור לשופר? | ראש השנה |
| new-knowledge-holidays-006 | ידע כללי | כיתה ב׳ | `holidays` | American / multiple choice | 4 | איזה מועד קשור לנטיעת עצים? | ט״ו בשבט |
| new-knowledge-israel_symbols-001 | ידע כללי | כיתה א׳ | `israel_symbols` | American / multiple choice | 2 | מהם צבעי דגל ישראל? | כחול ולבן |
| new-knowledge-israel_symbols-006 | ידע כללי | כיתה א׳ | `israel_symbols` | American / multiple choice | 2 | איזה שפה היא שפה רשמית בישראל? | עברית |
| new-knowledge-israel_symbols-002 | ידע כללי | כיתה ב׳ | `israel_symbols` | American / multiple choice | 3 | איזה סמל מופיע במרכז דגל ישראל? | מגן דוד |
| new-knowledge-israel_symbols-003 | ידע כללי | כיתה ב׳ | `israel_symbols` | American / multiple choice | 3 | מהי עיר הבירה של ישראל? | ירושלים |
| new-knowledge-israel_symbols-005 | ידע כללי | כיתה ב׳ | `israel_symbols` | American / multiple choice | 4 | איזה יום מציינים אחרי יום הזיכרון לחללי מערכות ישראל? | יום העצמאות |
| new-knowledge-israel_symbols-004 | ידע כללי | כיתה ג׳ | `israel_symbols` | American / multiple choice | 5 | מהו סמל המדינה? | מנורה וענפי זית |
| new-knowledge-time_concepts-001 | ידע כללי | כיתה א׳ | `time_concepts` | American / multiple choice | 1 | כמה ימים יש בשבוע? | 7 |
| new-knowledge-time_concepts-002 | ידע כללי | כיתה א׳ | `time_concepts` | American / multiple choice | 1 | מה בא אחרי יום שני? | יום שלישי |
| new-knowledge-time_concepts-005 | ידע כללי | כיתה א׳ | `time_concepts` | American / multiple choice | 2 | מה ארוך יותר: שבוע או חודש? | חודש |
| new-knowledge-time_concepts-004 | ידע כללי | כיתה ב׳ | `time_concepts` | American / multiple choice | 3 | כמה חודשים יש בשנה לועזית רגילה? | 12 |
| new-knowledge-time_concepts-006 | ידע כללי | כיתה ב׳ | `time_concepts` | American / multiple choice | 3 | אם היום יום רביעי, איזה יום יהיה בעוד יומיים? | יום שישי |
| new-knowledge-time_concepts-003 | ידע כללי | כיתה ג׳ | `time_concepts` | American / multiple choice | 5 | איזה חודש בא אחרי תשרי בלוח העברי? | חשוון |
| new-knowledge-verbal_analogies-001 | ידע כללי | כיתה ב׳ | `verbal_analogies` | American / multiple choice | 4 | ציפור היא לשמיים כמו דג הוא ל־? | ים |
| new-knowledge-verbal_analogies-002 | ידע כללי | כיתה ב׳ | `verbal_analogies` | American / multiple choice | 4 | עיפרון הוא לכתיבה כמו מספריים הם ל־? | גזירה |
| new-knowledge-verbal_analogies-003 | ידע כללי | כיתה ב׳ | `verbal_analogies` | American / multiple choice | 4 | רופא הוא לבית חולים כמו מורה היא ל־? | בית ספר |
| new-knowledge-verbal_analogies-004 | ידע כללי | כיתה ב׳ | `verbal_analogies` | American / multiple choice | 4 | חם הוא לקר כמו גבוה הוא ל־? | נמוך |
| new-knowledge-verbal_analogies-005 | ידע כללי | כיתה ג׳ | `verbal_analogies` | American / multiple choice | 5 | זרע הוא לצמח כמו ביצה היא ל־? | אפרוח |
| new-knowledge-verbal_analogies-006 | ידע כללי | כיתה ג׳ | `verbal_analogies` | American / multiple choice | 5 | ספר הוא לקריאה כמו שיר הוא ל־? | שירה/האזנה |
| new-knowledge-figural_analogies-001 | ידע כללי | כיתה ב׳ | `figural_analogies` | American / multiple choice | 4 | עיגול קטן : עיגול גדול כמו ריבוע קטן : ? | ריבוע גדול |
| new-knowledge-figural_analogies-002 | ידע כללי | כיתה ב׳ | `figural_analogies` | American / multiple choice | 4 | משולש אדום : משולש כחול כמו עיגול אדום : ? | עיגול כחול |
| new-knowledge-figural_analogies-004 | ידע כללי | כיתה ב׳ | `figural_analogies` | American / multiple choice | 4 | צורה אחת : שתי צורות כמו כוכב אחד : ? | שני כוכבים |
| new-knowledge-figural_analogies-003 | ידע כללי | כיתה ג׳ | `figural_analogies` | American / multiple choice | 5 | קו אופקי : קו אנכי כמו מלבן שוכב : ? | מלבן עומד |
| new-knowledge-figural_analogies-005 | ידע כללי | כיתה ג׳ | `figural_analogies` | American / multiple choice | 5 | ריבוע מלא : ריבוע ריק כמו עיגול מלא : ? | עיגול ריק |
| new-knowledge-figural_analogies-006 | ידע כללי | כיתה ג׳ | `figural_analogies` | American / multiple choice | 5 | חץ ימינה : חץ שמאלה כמו משולש פונה ימינה : ? | משולש פונה שמאלה |
| new-knowledge-figural_matrices-001 | ידע כללי | כיתה ב׳ | `figural_matrices` | American / multiple choice | 4 | במטריצה: בשורה הראשונה עיגול קטן ואז עיגול גדול. בשורה השנייה ריבוע קטן ואז __. מה חסר? | ריבוע גדול |
| new-knowledge-figural_matrices-002 | ידע כללי | כיתה ב׳ | `figural_matrices` | American / multiple choice | 4 | בשורה: צורה מלאה ואז צורה ריקה. אם יש משולש מלא ואז __, מה חסר? | משולש ריק |
| new-knowledge-figural_matrices-004 | ידע כללי | כיתה ב׳ | `figural_matrices` | American / multiple choice | 4 | בשורה הראשונה: 1 עיגול, 2 עיגולים. בשורה השנייה: 1 כוכב, __. מה חסר? | 2 כוכבים |
| new-knowledge-figural_matrices-003 | ידע כללי | כיתה ג׳ | `figural_matrices` | American / multiple choice | 5 | בעמודה הצבע משתנה מאדום לכחול. אם למעלה ריבוע אדום, למטה צריך להיות? | ריבוע כחול |
| new-knowledge-figural_matrices-005 | ידע כללי | כיתה ג׳ | `figural_matrices` | American / multiple choice | 5 | אם בכל שורה הצורה מסתובבת רבע סיבוב ימינה, מה יבוא אחרי חץ למעלה? | חץ ימינה |
| new-knowledge-figural_matrices-006 | ידע כללי | כיתה ג׳ | `figural_matrices` | American / multiple choice | 5 | במטריצה 2×2: שמאל עליון עיגול אדום, ימין עליון עיגול כחול, שמאל תחתון ריבוע אדום. מה ימין תחתון? | ריבוע כחול |
| new-knowledge-odd_one_out-001 | ידע כללי | כיתה ב׳ | `odd_one_out` | American / multiple choice | 3 | מה יוצא דופן? כלב, חתול, סוס, שולחן | שולחן |
| new-knowledge-odd_one_out-002 | ידע כללי | כיתה ב׳ | `odd_one_out` | American / multiple choice | 3 | מה יוצא דופן? תפוח, בננה, גזר, ענבים | גזר |
| new-knowledge-odd_one_out-003 | ידע כללי | כיתה ב׳ | `odd_one_out` | American / multiple choice | 3 | מה יוצא דופן? אדום, כחול, ירוק, עגול | עגול |
| new-knowledge-odd_one_out-004 | ידע כללי | כיתה ב׳ | `odd_one_out` | American / multiple choice | 4 | מה יוצא דופן? 2, 4, 6, 9 | 9 |
| new-knowledge-odd_one_out-005 | ידע כללי | כיתה ב׳ | `odd_one_out` | American / multiple choice | 4 | מה יוצא דופן? כיסא, שולחן, ספה, כף | כף |
| new-knowledge-odd_one_out-006 | ידע כללי | כיתה ג׳ | `odd_one_out` | American / multiple choice | 5 | מה יוצא דופן? אביב, קיץ, ינואר, חורף | ינואר |
| new-knowledge-generalization_rules-002 | ידע כללי | כיתה א׳ | `generalization_rules` | American / multiple choice | 2 | מה משותף: כלב, חתול, סוס? | כולם בעלי חיים |
| new-knowledge-generalization_rules-001 | ידע כללי | כיתה ב׳ | `generalization_rules` | American / multiple choice | 3 | מה הכלל בקבוצה: 2, 4, 6, 8? | מספרים זוגיים |
| new-knowledge-generalization_rules-003 | ידע כללי | כיתה ב׳ | `generalization_rules` | American / multiple choice | 3 | מה הכלל: 10, 20, 30, 40? | קפיצות של 10 |
| new-knowledge-generalization_rules-004 | ידע כללי | כיתה ב׳ | `generalization_rules` | American / multiple choice | 4 | איזו מילה מתאימה לקבוצה: כינור, תוף, פסנתר, ___ | גיטרה |
| new-knowledge-generalization_rules-005 | ידע כללי | כיתה ג׳ | `generalization_rules` | American / multiple choice | 5 | מה הכלל: ריבוע, מלבן, מעוין? | כולם מרובעים |
| new-knowledge-generalization_rules-006 | ידע כללי | כיתה ג׳ | `generalization_rules` | American / multiple choice | 5 | מה הכלל: 1, 3, 6, 10? | מוסיפים בכל פעם מספר גדול באחד |
| new-knowledge-non_routine_problems-002 | ידע כללי | כיתה ב׳ | `non_routine_problems` | Open input | 3 | איך אפשר להגיע ל־10 בעזרת שני מספרים שונים? | לדוגמה 4 + 6 |
| new-knowledge-non_routine_problems-006 | ידע כללי | כיתה ב׳ | `non_routine_problems` | American / multiple choice | 3 | אם כל חתול אוכל דג אחד, ויש 4 חתולים ו־3 דגים, כמה חתולים לא יקבלו דג? | 1 |
| new-knowledge-non_routine_problems-003 | ידע כללי | כיתה ב׳ | `non_routine_problems` | American / multiple choice | 4 | יש לך 2 מטבעות שמסתכמים ל־7 שקלים. אילו מטבעות יכולים להיות? | 5 ו־2 |
| new-knowledge-non_routine_problems-004 | ידע כללי | כיתה ב׳ | `non_routine_problems` | American / multiple choice | 4 | איזה מספר גם גדול מ־20, גם קטן מ־30, וגם ספרת היחידות שלו 5? | 25 |
| new-knowledge-non_routine_problems-001 | ידע כללי | כיתה ג׳ | `non_routine_problems` | American / multiple choice | 5 | יש 3 ילדים וכל אחד לוחץ יד לכל אחד פעם אחת. כמה לחיצות ידיים יש? | 3 |
| new-knowledge-non_routine_problems-005 | ידע כללי | כיתה ג׳ | `non_routine_problems` | American / multiple choice | 5 | כמה דרכים יש לסדר שני צבעים שונים בשורה: אדום וכחול? | 2 |
| new-knowledge-multiple_solution_paths-001 | ידע כללי | כיתה ב׳ | `multiple_solution_paths` | Open input | 3 | מצאו שתי דרכים להגיע ל־12 בחיבור. | לדוגמה 6+6 ו־10+2 |
| new-knowledge-multiple_solution_paths-002 | ידע כללי | כיתה ב׳ | `multiple_solution_paths` | Open input | 4 | מצאו שתי דרכים להגיע ל־20 בעזרת כפל. | לדוגמה 4×5 ו־2×10 |
| new-knowledge-multiple_solution_paths-003 | ידע כללי | כיתה ב׳ | `multiple_solution_paths` | Open input | 4 | איך אפשר לחשב 19 + 6 בדרך נוחה? | לדוגמה 20 + 5 = 25 |
| new-knowledge-multiple_solution_paths-005 | ידע כללי | כיתה ב׳ | `multiple_solution_paths` | Open input | 4 | כתבו שתי שאלות שונות שהתשובה שלהן היא 15. | לדוגמה 10+5 ו־20-5 |
| new-knowledge-multiple_solution_paths-004 | ידע כללי | כיתה ג׳ | `multiple_solution_paths` | Open input | 5 | מצאו שתי דרכים לחלק 24 לקבוצות שוות. | לדוגמה 4 קבוצות של 6 ו־3 קבוצות של 8 |
| new-knowledge-multiple_solution_paths-006 | ידע כללי | כיתה ג׳ | `multiple_solution_paths` | Open input | 5 | מצאו שתי דרכים להסביר למה 8×5 = 40. | לדוגמה חיבור חוזר או 4×10 |
| new-knowledge-conditions_logic-002 | ידע כללי | כיתה ב׳ | `conditions_logic` | American / multiple choice | 3 | בחרו מספר שהוא גם זוגי וגם גדול מ־10: 7, 9, 12, 15 | 12 |
| new-knowledge-conditions_logic-003 | ידע כללי | כיתה ב׳ | `conditions_logic` | American / multiple choice | 3 | אם היום לא שבת ולא ראשון, איזה יום יכול להיות? | יום שני |
| new-knowledge-conditions_logic-001 | ידע כללי | כיתה ב׳ | `conditions_logic` | American / multiple choice | 4 | אם כל הכלבים הם חיות, ורקסי הוא כלב, מה נכון? | רקסי הוא חיה |
| new-knowledge-conditions_logic-005 | ידע כללי | כיתה ב׳ | `conditions_logic` | American / multiple choice | 4 | בחרו מילה שמתחילה באות ש וגם היא חיה: שמש, שולחן, שועל, ספר | שועל |
| new-knowledge-conditions_logic-004 | ידע כללי | כיתה ג׳ | `conditions_logic` | American / multiple choice | 5 | כל הצורות הכחולות הן עגולות. הצורה שלי כחולה. מה אפשר להסיק? | היא עגולה |
| new-knowledge-conditions_logic-006 | ידע כללי | כיתה ג׳ | `conditions_logic` | American / multiple choice | 5 | אם מספר גדול מ־30 וקטן מ־40, והוא אי־זוגי ומתחלק ב־5, מה המספר? | 35 |
| new-knowledge-spatial_reasoning-004 | ידע כללי | כיתה ב׳ | `spatial_reasoning` | American / multiple choice | 3 | איזו צורה תתקבל מקיפול דף לחצי לאורך? | מלבן צר יותר |
| new-knowledge-spatial_reasoning-002 | ידע כללי | כיתה ב׳ | `spatial_reasoning` | American / multiple choice | 4 | אם מסובבים חץ שמצביע למעלה רבע סיבוב ימינה, לאן הוא יצביע? | ימינה |
| new-knowledge-spatial_reasoning-005 | ידע כללי | כיתה ב׳ | `spatial_reasoning` | American / multiple choice | 4 | כמה פאות יש לקובייה? | 6 |
| new-knowledge-spatial_reasoning-001 | ידע כללי | כיתה ג׳ | `spatial_reasoning` | American / multiple choice | 5 | איזו צורה תקבלו אם תחברו שני משולשים זהים בצלע ארוכה? | ריבוע או מעוין לפי המשולשים |
| new-knowledge-spatial_reasoning-003 | ידע כללי | כיתה ג׳ | `spatial_reasoning` | American / multiple choice | 5 | מה נמצא מימין לילד אם פניו פונות אלינו? | הצד השמאלי שלנו |
| new-knowledge-spatial_reasoning-006 | ידע כללי | כיתה ג׳ | `spatial_reasoning` | American / multiple choice | 5 | אם יש קובייה ועליה נקודה בצד העליון, אחרי סיבוב קדימה הנקודה תעבור ל־? | הצד הקדמי |

## Math Practice Bank

Source: `src/lib/math-questions.ts`

| ID | Grade | Topic | Type | Difficulty | Question | Answer |
| --- | --- | --- | --- | ---: | --- | --- |
| math-g1-001 | כיתה א׳ | מנייה וזיהוי כמות | Open input | 2 | כמה תפוחים יש אם ספרנו: 🍎🍎🍎🍎🍎? | 5 |
| math-g1-002 | כיתה א׳ | חיבור עד 10/20 | Open input | 2 | כמה זה 4 + 3? | 7 |
| math-g1-003 | כיתה א׳ | חיסור בסיסי | Open input | 2 | לדנה היו 9 מדבקות. היא נתנה 2. כמה נשארו? | 7 |
| math-g1-004 | כיתה א׳ | סדר מספרים | American / multiple choice | 2 | איזה מספר בא אחרי 14? | 15 |
| math-g1-005 | כיתה א׳ | השוואת כמויות | Open input | 2 | מה גדול יותר: 8 או 5? | 8 |
| math-g1-006 | כיתה א׳ | מנייה וזיהוי כמות | Open input | 2 | כמה כוכבים יש? ⭐⭐⭐⭐⭐⭐⭐ | 7 |
| math-g1-007 | כיתה א׳ | חיבור עד 10/20 | Open input | 2 | כמה זה 6 + 5? | 11 |
| math-g1-008 | כיתה א׳ | סדר מספרים | American / multiple choice | 2 | איזה מספר בא לפני 10? | 9 |
| math-g2-001 | כיתה ב׳ | חיבור דו־ספרתי | Open input | 2 | כמה זה 23 + 14? | 37 |
| math-g2-002 | כיתה ב׳ | חיסור דו־ספרתי | Open input | 2 | כמה זה 48 − 16? | 32 |
| math-g2-003 | כיתה ב׳ | כפל כחיבור חוזר | American / multiple choice | 5 | מה שווה 3 קבוצות של 4? | 12 |
| math-g2-004 | כיתה ב׳ | זוגי/אי־זוגי | American / multiple choice | 2 | האם 27 הוא זוגי או אי־זוגי? | אי־זוגי |
| math-g2-005 | כיתה ב׳ | כסף / עודף | Open input | 2 | יש לך 10 שקלים וקנית משהו ב־6 שקלים. כמה עודף תקבל? | 4 |
| math-g2-006 | כיתה ב׳ | חיבור דו־ספרתי | Open input | 5 | כמה זה 35 + 28? | 63 |
| math-g2-007 | כיתה ב׳ | זוגי/אי־זוגי | American / multiple choice | 2 | האם 44 הוא זוגי או אי־זוגי? | זוגי |
| math-g3-001 | כיתה ג׳ | כפל | Open input | 5 | כמה זה 7 × 8? | 56 |
| math-g3-002 | כיתה ג׳ | חילוק | Open input | 2 | כמה זה 36 ÷ 6? | 6 |
| math-g3-003 | כיתה ג׳ | בעיה מילולית בכפל | Open input | 2 | בכל קופסה יש 5 עפרונות. יש 4 קופסאות. כמה עפרונות יש? | 20 |
| math-g3-004 | כיתה ג׳ | שברים פשוטים | American / multiple choice | 5 | איזה שבר גדול יותר? | 1/2 |
| math-g3-005 | כיתה ג׳ | סדר פעולות פשוט | Open input | 5 | כמה זה 5 + 3 × 2? | 11 |
| math-g3-006 | כיתה ג׳ | כפל | Open input | 5 | כמה זה 9 × 6? | 54 |
| math-g3-007 | כיתה ג׳ | חילוק | Open input | 2 | כמה זה 42 ÷ 7? | 6 |
| math-g4-001 | כיתה ד׳ | חיבור וחיסור מספרים גדולים | Open input | 5 | כמה זה 1,245 + 378? | 1623 |
| math-g4-002 | כיתה ד׳ | כפל במספר דו־ספרתי | Open input | 2 | כמה זה 24 × 3? | 72 |
| math-g4-003 | כיתה ד׳ | חילוק עם שארית | Open input | 5 | כמה זה 29 ÷ 5? | 5 שארית 4 |
| math-g4-004 | כיתה ד׳ | שברים שווי ערך | American / multiple choice | 5 | איזה שבר שווה ל־1/2? | 2/4 |
| math-g4-005 | כיתה ד׳ | היקף | Open input | 5 | מלבן באורך 6 וברוחב 3. מה ההיקף? | 18 |
| math-g4-006 | כיתה ד׳ | כפל במספר דו־ספרתי | Open input | 2 | כמה זה 15 × 4? | 60 |
| math-g5-001 | כיתה ה׳ | חיבור שברים | Open input | 5 | כמה זה 1/4 + 2/4? | 3/4 |
| math-g5-002 | כיתה ה׳ | כפל שברים פשוט | Open input | 5 | כמה זה 1/2 × 8? | 4 |
| math-g5-003 | כיתה ה׳ | מספרים עשרוניים | Open input | 5 | כמה זה 3.5 + 2.25? | 5.75 |
| math-g5-004 | כיתה ה׳ | אחוזים בסיסיים | American / multiple choice | 5 | כמה הם 10% מתוך 80? | 8 |
| math-g5-005 | כיתה ה׳ | שטח מלבן | Open input | 2 | מלבן באורך 7 וברוחב 4. מה השטח? | 28 |
| math-g5-006 | כיתה ה׳ | מספרים עשרוניים | Open input | 5 | כמה זה 4.8 - 1.3? | 3.5 |
| math-g6-001 | כיתה ו׳ | אחוזים | Open input | 5 | כמה הם 25% מתוך 120? | 30 |
| math-g6-002 | כיתה ו׳ | יחס | Open input | 5 | היחס בין בנים לבנות הוא 2:3. אם יש 10 בנים, כמה בנות יש? | 15 |
| math-g6-003 | כיתה ו׳ | שברים ועשרוניים | American / multiple choice | 5 | מה גדול יותר? | 0.75 |
| math-g6-004 | כיתה ו׳ | סדר פעולות | Open input | 5 | כמה זה 18 − 4 × 3 + 2? | 8 |
| math-g6-005 | כיתה ו׳ | ממוצע | Open input | 2 | הציונים הם 80, 90, 100. מה הממוצע? | 90 |
| math-g6-006 | כיתה ו׳ | אחוזים | Open input | 2 | כמה הם 50% מתוך 64? | 32 |

## Notes

- Adaptive assessment questions in `src/lib/adaptive-assessment.ts` are not included here because that bank uses `level`, not `difficultyScore`.
- Total listed questions: 60.
