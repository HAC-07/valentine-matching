insert into quizzes (id, creator_name, title, valentine_threshold)
values
  ('11111111-1111-1111-1111-111111111111', 'Himanshu', 'How well do you know me?', 100);

insert into questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option)
values
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'My go-to coffee order?', 'Iced oat latte', 'Matcha', 'Cold brew', 'Chai', 'A'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Ideal date night vibe?', 'Dive bar', 'Museum late night', 'Picnic at sunset', 'Arcade + tacos', 'C'),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Pet I would adopt first?', 'Golden retriever', 'Cat', 'Rescue pup', 'No pets', 'B'),
  ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'My guilty-pleasure snack?', 'Hot Cheetos', 'Dark chocolate', 'Popcorn', 'Boba', 'B'),
  ('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111111', 'Sunday reset activity?', 'Grocery haul', 'Movie marathon', 'Long walk', 'Deep clean', 'C'),
  ('22222222-2222-2222-2222-222222222226', '11111111-1111-1111-1111-111111111111', 'My chaos trait?', 'Late texter', 'Over-planner', 'Spontaneous trips', 'Always early', 'C'),
  ('22222222-2222-2222-2222-222222222227', '11111111-1111-1111-1111-111111111111', 'Pick my vibe playlist', 'R&B slow jams', 'Indie pop', 'House beats', 'Acoustic covers', 'A'),
  ('22222222-2222-2222-2222-222222222228', '11111111-1111-1111-1111-111111111111', 'My comfort TV show?', 'Friends', 'The Office', 'Insecure', 'Bridgerton', 'C');

