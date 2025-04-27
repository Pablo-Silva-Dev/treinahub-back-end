-- AlterTable
ALTER TABLE "_TrainingToUser" ADD CONSTRAINT "_TrainingToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TrainingToUser_AB_unique";

-- CreateIndex
CREATE INDEX "Avatar_user_id_idx" ON "Avatar"("user_id");

-- CreateIndex
CREATE INDEX "Certificate_user_id_training_id_idx" ON "Certificate"("user_id", "training_id");

-- CreateIndex
CREATE INDEX "ContactSupport_company_id_idx" ON "ContactSupport"("company_id");

-- CreateIndex
CREATE INDEX "FaqQuestion_company_id_idx" ON "FaqQuestion"("company_id");

-- CreateIndex
CREATE INDEX "Option_question_id_idx" ON "Option"("question_id");

-- CreateIndex
CREATE INDEX "Question_quiz_id_idx" ON "Question"("quiz_id");

-- CreateIndex
CREATE INDEX "Quiz_training_id_idx" ON "Quiz"("training_id");

-- CreateIndex
CREATE INDEX "QuizAttempt_quiz_id_user_id_idx" ON "QuizAttempt"("quiz_id", "user_id");

-- CreateIndex
CREATE INDEX "QuizResponse_quiz_attempt_id_question_id_idx" ON "QuizResponse"("quiz_attempt_id", "question_id");

-- CreateIndex
CREATE INDEX "QuizResult_quiz_id_user_id_idx" ON "QuizResult"("quiz_id", "user_id");

-- CreateIndex
CREATE INDEX "QuizResult_quiz_attempt_id_user_id_idx" ON "QuizResult"("quiz_attempt_id", "user_id");

-- CreateIndex
CREATE INDEX "RecoveryCode_user_id_idx" ON "RecoveryCode"("user_id");

-- CreateIndex
CREATE INDEX "Training_company_id_idx" ON "Training"("company_id");

-- CreateIndex
CREATE INDEX "TrainingMetrics_user_id_training_id_idx" ON "TrainingMetrics"("user_id", "training_id");

-- CreateIndex
CREATE INDEX "User_company_id_idx" ON "User"("company_id");

-- CreateIndex
CREATE INDEX "VideoClass_training_id_idx" ON "VideoClass"("training_id");

-- CreateIndex
CREATE INDEX "WatchedClasses_user_id_training_id_idx" ON "WatchedClasses"("user_id", "training_id");

-- CreateIndex
CREATE INDEX "WatchedClasses_user_id_videoclass_id_idx" ON "WatchedClasses"("user_id", "videoclass_id");
