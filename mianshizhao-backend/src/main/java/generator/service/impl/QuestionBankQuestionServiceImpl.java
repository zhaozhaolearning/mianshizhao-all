package generator.service.impl;

import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import generator.domain.QuestionBankQuestion;
import generator.mapper.QuestionBankQuestionMapper;
import org.springframework.stereotype.Service;

/**
* @author liangjunzhao
* @description 针对表【question_bank_question(题库题目)】的数据库操作Service实现
* @createDate 2024-11-12 01:45:00
*/
@Service
public class QuestionBankQuestionServiceImpl extends ServiceImpl<QuestionBankQuestionMapper, QuestionBankQuestion>
    implements IService<QuestionBankQuestion> {

}




